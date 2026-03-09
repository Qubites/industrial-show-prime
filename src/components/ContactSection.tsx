import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', projectType: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission placeholder
    console.log('Form submitted:', formData);
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
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">+45 43 45 11 49</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Sydvestvej 111 D</p>
                  <p className="text-sm text-muted-foreground">2600 Glostrup, Denmark</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a
                href="tel:+4543451149"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone size={16} /> {t.contact.callNow}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t.contact.form.name}
                className={inputClass}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder={t.contact.form.company}
                className={inputClass}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder={t.contact.form.email}
                className={inputClass}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder={t.contact.form.phone}
                className={inputClass}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <input
              type="text"
              placeholder={t.contact.form.projectType}
              className={inputClass}
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            />
            <textarea
              placeholder={t.contact.form.message}
              rows={5}
              className={inputClass + " resize-none"}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Send size={16} /> {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
