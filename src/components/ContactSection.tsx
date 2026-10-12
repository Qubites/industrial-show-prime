import { useRef, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, MapPin, Mail, Send, Instagram, Linkedin, Facebook, CheckCircle2, Loader2 } from 'lucide-react';
import { company } from '@/lib/company';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm = { name: '', company: '', email: '', phone: '', projectType: '', message: '' };

const socials = [
  { href: company.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: company.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: company.social.facebook, label: 'Facebook', Icon: Facebook },
];

const ContactSection = () => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState(emptyForm);
  // Hidden from people; robots fill it in, and kontakt.php then drops the message.
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const openedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}kontakt.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website, lang, elapsed: Date.now() - openedAt.current }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(`kontakt.php ${res.status}`);
      setStatus('sent');
      setFormData(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

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
              <p className="text-lg font-semibold text-foreground">{t.contact.form.sent}</p>
              <button
                type="button"
                onClick={() => {
                  openedAt.current = Date.now();
                  setStatus('idle');
                }}
                className="text-sm text-primary font-medium hover:underline"
              >
                {t.contact.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-4">
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
                <input
                  type="text"
                  placeholder={t.contact.form.name}
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                  required
                />
                <input
                  type="text"
                  placeholder={t.contact.form.company}
                  className={inputClass}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  maxLength={150}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder={t.contact.form.email}
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={200}
                  required
                />
                <input
                  type="tel"
                  placeholder={t.contact.form.phone}
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  maxLength={50}
                />
              </div>
              <input
                type="text"
                placeholder={t.contact.form.projectType}
                className={inputClass}
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                maxLength={150}
              />
              <textarea
                placeholder={t.contact.form.message}
                rows={5}
                className={inputClass + " resize-none"}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                maxLength={5000}
                required
              />
              {status === 'error' && (
                <p className="text-sm text-destructive" role="alert">
                  {t.contact.form.error}{' '}
                  <a href={company.phoneHref} className="underline">{company.phone}</a> · <a href={`mailto:${company.email}`} className="underline">{company.email}</a>
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send size={16} /> {t.contact.form.submit}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
