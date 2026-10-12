import { useLanguage } from '@/i18n/LanguageContext';
import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';
import { company } from '@/lib/company';

const channels = [
  { href: company.social.instagram, label: 'Instagram', handle: '@smedefirmaetl.s.staalmontage', Icon: Instagram },
  { href: company.social.linkedin, label: 'LinkedIn', handle: 'Smedefirmaet L.S Stålmontage ApS', Icon: Linkedin },
  { href: company.social.facebook, label: 'Facebook', handle: 'Smedefirmaet L. S. Stålmontage ApS', Icon: Facebook },
];

const SocialShowcase = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t.social.title}</h2>
            <p className="text-muted-foreground">{t.social.sub}</p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
            {channels.map(({ href, label, handle, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 bg-card p-5 rounded-lg border border-border hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </span>
                  <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground truncate">{handle}</p>
                </div>
                <span className="text-xs font-medium text-primary">{t.social.follow}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialShowcase;
