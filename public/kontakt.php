<?php
/*
 * Kontaktformularen på ls-staalmontage.dk.
 *
 * Siden sender formularen hertil som JSON; scriptet sender den videre som en
 * almindelig mail til firmaet. Svar til kunden: tryk "Svar" i mailen
 * (Reply-To er kundens egen adresse).
 *
 *   GET  kontakt.php  -> {"ok":true,"ready":true,"php":"8.2.x"}  (tjek uden at sende noget)
 *   POST kontakt.php  -> {"ok":true} når mailen er afleveret
 *
 * Skrevet, så det kører på PHP 5.3 og nyere (webhotellet hos Gigahost).
 */

define('MAIL_TO', 'mail@ls-staalmontage.dk');
define('MAIL_FROM', 'mail@ls-staalmontage.dk');
define('MAIL_FROM_NAME', 'Hjemmesiden ls-staalmontage.dk');
define('MIN_FILL_MS', 3000);   // udfyldt hurtigere end 3 sekunder = robot
define('MAX_PER_HOUR', 20);    // loft for hele siden, så en robot ikke kan oversvømme indbakken
define('MAX_BODY_BYTES', 20000);

// Old PHP versions print a warning (and break the JSON reply) when no time zone is set.
date_default_timezone_set('Europe/Copenhagen');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply($status, $data)
{
    if (function_exists('http_response_code')) {
        http_response_code($status);
    } else {
        header('X-Status: ' . $status, true, $status);
    }
    echo json_encode($data);
    exit;
}

function field($in, $key, $max)
{
    $value = (isset($in[$key]) && is_string($in[$key])) ? trim($in[$key]) : '';
    $value = str_replace(array("\r\n", "\r"), "\n", $value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max, 'UTF-8');
    }
    return substr($value, 0, $max);
}

function oneLine($value)
{
    return trim(preg_replace('/[\x00-\x1F\x7F]+/', ' ', $value));
}

function encodeHeader($text)
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

// Returns false when the site-wide hourly cap is reached. Fails open: if the
// counter file can't be written, the message is still sent.
function underHourlyCap()
{
    $file = rtrim(sys_get_temp_dir(), '/\\') . '/ls-staalmontage-kontakt-' . md5(__FILE__) . '.json';
    $now = time();
    $stamps = array();
    $raw = @file_get_contents($file);
    if ($raw !== false) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            foreach ($decoded as $t) {
                if (is_int($t) && $t > $now - 3600) {
                    $stamps[] = $t;
                }
            }
        }
    }
    if (count($stamps) >= MAX_PER_HOUR) {
        return false;
    }
    $stamps[] = $now;
    @file_put_contents($file, json_encode($stamps), LOCK_EX);
    return true;
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
if ($method === 'GET') {
    reply(200, array('ok' => true, 'ready' => function_exists('mail'), 'php' => PHP_VERSION));
}
if ($method !== 'POST') {
    reply(405, array('ok' => false, 'error' => 'method'));
}

$raw = file_get_contents('php://input');
if (strlen($raw) > MAX_BODY_BYTES) {
    reply(413, array('ok' => false, 'error' => 'too_large'));
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    $in = $_POST;
}

// Robots: they fill the hidden "website" field or submit at once. They get the
// same answer as a person, but nothing is sent.
$elapsed = isset($in['elapsed']) ? (int) $in['elapsed'] : 0;
if (field($in, 'website', 200) !== '' || $elapsed < MIN_FILL_MS) {
    reply(200, array('ok' => true));
}

$name = oneLine(field($in, 'name', 100));
$company = oneLine(field($in, 'company', 150));
$email = oneLine(field($in, 'email', 200));
$phone = oneLine(field($in, 'phone', 50));
$projectType = oneLine(field($in, 'projectType', 150));
$message = field($in, 'message', 5000);
$lang = field($in, 'lang', 5) === 'en' ? 'engelsk' : 'dansk';

// "field" tells the page which message to show under which field.
if ($name === '') {
    reply(400, array('ok' => false, 'error' => 'invalid', 'field' => 'name'));
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(400, array('ok' => false, 'error' => 'invalid', 'field' => 'email'));
}
if ($message === '') {
    reply(400, array('ok' => false, 'error' => 'invalid', 'field' => 'message'));
}

if (!underHourlyCap()) {
    reply(429, array('ok' => false, 'error' => 'busy'));
}

$subject = 'Henvendelse fra hjemmesiden: ' . $name . ($company !== '' ? ' (' . $company . ')' : '');

$body = "Ny henvendelse fra kontaktformularen på ls-staalmontage.dk\n"
    . "Tryk Svar for at skrive direkte til kunden.\n\n"
    . 'Navn:        ' . $name . "\n"
    . 'Virksomhed:  ' . ($company !== '' ? $company : '-') . "\n"
    . 'E-mail:      ' . $email . "\n"
    . 'Telefon:     ' . ($phone !== '' ? $phone : '-') . "\n"
    . 'Projekttype: ' . ($projectType !== '' ? $projectType : '-') . "\n\n"
    . "Besked:\n" . $message . "\n\n"
    . '-- ' . "\n"
    . 'Sendt ' . date('d.m.Y H:i') . ' fra siden på ' . $lang . '.' . "\n";

$headers = 'From: ' . encodeHeader(MAIL_FROM_NAME) . ' <' . MAIL_FROM . ">\r\n"
    . 'Reply-To: ' . encodeHeader($name) . ' <' . $email . ">\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n"
    . 'X-Mailer: ls-staalmontage.dk kontaktformular';

$encodedSubject = encodeHeader($subject);

// Envelope sender on our own domain so SPF passes; some hosts refuse -f, so retry without it.
$sent = @mail(MAIL_TO, $encodedSubject, $body, $headers, '-f' . MAIL_FROM);
if (!$sent) {
    $sent = @mail(MAIL_TO, $encodedSubject, $body, $headers);
}

if (!$sent) {
    reply(500, array('ok' => false, 'error' => 'mail_failed'));
}
reply(200, array('ok' => true));
