import { useLanguage } from '@/i18n/LanguageContext';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { company } from '@/lib/company';

const socials = [
  { href: company.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: company.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: company.social.facebook, label: 'Facebook', Icon: Facebook },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-graphite border-t border-white/10 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-3">{company.displayName}</h3>
            <p className="text-sm text-white/60">CVR: {company.cvr}</p>
            <p className="text-sm text-white/60">P-nr: {company.pnr}</p>
            <p className="text-sm text-white/60 mt-2">
              {company.bank.name}
              <br />
              Reg. {company.bank.reg} · {t.footer.account} {company.bank.account}
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-start gap-2 text-sm text-white/60">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                {company.street}
                <br />
                {company.city}
              </span>
            </p>
            <a href={company.phoneHref} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              <Phone size={14} className="flex-shrink-0" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              <Mail size={14} className="flex-shrink-0" /> {company.email}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#projects" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav.projects}</a>
            <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav.services}</a>
            <a href="#certifications" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav.certifications}</a>
            <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex flex-col gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Icon size={14} className="flex-shrink-0" /> {label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {company.displayName}. {t.footer.rights}
          </p>
          <a href={`${import.meta.env.BASE_URL}privatliv.html`} className="text-xs text-white/50 hover:text-white transition-colors">
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
