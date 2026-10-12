import { useRef, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, MapPin, Mail, Send, Instagram, Linkedin, Facebook, CheckCircle2, Loader2 } from 'lucide-react';
import { company } from '@/lib/company';

type Status = 'idle' | 'sending' | 'sent' | 'busy' | 'error';
type FieldKey = 'name' | 'company' | 'email' | 'phone' | 'projectType' | 'message';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const emptyForm: Record<FieldKey, string> = { name: '', company: '', email: '', phone: '', projectType: '', message: '' };

// Same rule as kontakt.php (PHP's FILTER_VALIDATE_EMAIL wants a dot in the domain);
// the browser's own check lets "kim@gmail" through.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const socials = [
  { href: company.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: company.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: company.social.facebook, label: 'Facebook', Icon: Facebook },
];

const ContactSection = () => {
  const { lang, t } = useLanguage();
  const f = t.contact.form;
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  // Hidden from people; robots fill it in, and kontakt.php then drops the message.
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const openedAt = useRef(Date.now());
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const validate = (data: typeof formData): Errors => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = f.errors.name;
    if (!data.email.trim()) next.email = f.errors.emailMissing;
    else if (!EMAIL_RE.test(data.email.trim())) next.email = f.errors.emailInvalid;
    if (!data.message.trim()) next.message = f.errors.message;
    return next;
  };

  const showErrors = (next: Errors) => {
    setErrors(next);
    const first = (['name', 'email', 'message'] as const).find((k) => next[k]);
    if (first) fieldRefs.current[first]?.focus();
  };

  const update = (key: FieldKey, value: string) => {
    setFormData((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === 'error' || status === 'busy') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(formData);
    if (Object.keys(found).length) {
      showErrors(found);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}kontakt.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website, lang, elapsed: Date.now() - openedAt.current }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('sent');
        setFormData(emptyForm);
        setErrors({});
        return;
      }
      if (res.status === 400 && (data?.field === 'name' || data?.field === 'email' || data?.field === 'message')) {
        setStatus('idle');
        const key = data.field as 'name' | 'email' | 'message';
        showErrors({ [key]: key === 'email' ? f.errors.emailInvalid : f.errors[key] });
        return;
      }
      setStatus(res.status === 429 ? 'busy' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (invalid: boolean) =>
    `w-full bg-secondary border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
      invalid ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
    }`;

  const field = (
    key: FieldKey,
    opts: { type?: string; required?: boolean; maxLength: number; autoComplete?: string; textarea?: boolean },
  ) => {
    const id = `kontakt-${key}`;
    const error = (errors as Record<string, string | undefined>)[key];
    const placeholder = (f.placeholders as Record<string, string>)[key] || undefined;
    const common = {
      id,
      name: key,
      value: formData[key],
      placeholder,
      maxLength: opts.maxLength,
      autoComplete: opts.autoComplete,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${id}-fejl` : undefined,
      className: inputClass(Boolean(error)) + (opts.textarea ? ' resize-none' : ''),
    };
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
          {f[key]}
          {opts.required && <span className="text-primary"> *</span>}
        </label>
        {opts.textarea ? (
          <textarea
            {...common}
            ref={(el) => { fieldRefs.current[key] = el; }}
            rows={5}
            onChange={(e) => update(key, e.target.value)}
          />
        ) : (
          <input
            {...common}
            ref={(el) => { fieldRefs.current[key] = el; }}
            type={opts.type ?? 'text'}
            onChange={(e) => update(key, e.target.value)}
          />
        )}
        {error && (
          <p id={`${id}-fejl`} className="mt-1.5 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.contact.title}</h2>
            <p className="text-muted-foreground mb-8">{t.contact.sub}</p>

            <div className="space-y-6">
              <a href={company.phoneHref} className="flex items-start gap-3 group">
                <Phone size={20} className="text-primary mt-0.5" />
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{company.phone}</p>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-start gap-3 group">
                <Mail size={20} className="text-primary mt-0.5" />
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{company.email}</p>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{company.street}</p>
                  <p className="text-sm text-muted-foreground">{company.city}, Denmark</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone size={16} /> {t.contact.callNow}
              </a>
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.contact.follow} – ${label}`}
                  title={label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {status === 'sent' ? (
            <div className="flex flex-col items-start justify-center gap-4 rounded-lg border border-primary/30 bg-card p-8" role="status">
              <CheckCircle2 size={32} className="text-primary" />
              <p className="text-lg font-semibold text-foreground">{f.sent}</p>
              <button
                type="button"
                onClick={() => {
                  openedAt.current = Date.now();
                  setStatus('idle');
                }}
                className="text-sm text-primary font-medium hover:underline"
              >
                {f.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="relative space-y-4">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {field('name', { required: true, maxLength: 100, autoComplete: 'name' })}
                {field('company', { maxLength: 150, autoComplete: 'organization' })}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {field('email', { type: 'email', required: true, maxLength: 200, autoComplete: 'email' })}
                {field('phone', { type: 'tel', maxLength: 50, autoComplete: 'tel' })}
              </div>
              {field('projectType', { maxLength: 150 })}
              {field('message', { required: true, maxLength: 5000, textarea: true })}

              {(status === 'error' || status === 'busy') && (
                <p className="text-sm text-destructive" role="alert">
                  {status === 'busy' ? f.errors.busy : f.error}{' '}
                  <a href={company.phoneHref} className="underline">{company.phone}</a> · <a href={`mailto:${company.email}`} className="underline">{company.email}</a>
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> {f.sending}
                    </>
                  ) : (
                    <>
                      <Send size={16} /> {f.submit}
                    </>
                  )}
                </button>
                <span className="text-xs text-muted-foreground">{f.required}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {f.privacy}{' '}
                <a href={`${import.meta.env.BASE_URL}privatliv.html`} className="underline hover:text-primary">
                  {f.privacyLink}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
