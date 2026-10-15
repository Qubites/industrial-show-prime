import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowUpRight, Building } from 'lucide-react';
import eagles from '@/assets/partners/herlev-eagles.webp';
import { sectors } from '@/lib/references';

// Same list as the references page, in sector order.
const clients = sectors.flatMap((sector) => sector.clients.map((client) => client.name));

const References = () => {
  const { t } = useLanguage();

  return (
    <section id="references" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.references.title}</h2>
          <p className="text-muted-foreground">{t.references.sub}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {clients.map((client, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 bg-card p-3 sm:p-5 rounded-lg border border-border">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                <Building size={18} className="text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground">{client}</span>
            </div>
          ))}
        </div>

        <a
          href={`${import.meta.env.BASE_URL}referencer.html`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity mb-8"
        >
          {t.references.all} <ArrowUpRight size={16} />
        </a>

        <a
          href="https://herleveagles.dk/partnere/partneroversigt/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 bg-card p-5 rounded-lg border border-border hover:border-primary/40 transition-colors mb-8 max-w-xl"
        >
          <img src={eagles} alt="Herlev Eagles" width={64} height={64} loading="lazy" className="w-16 h-16 rounded flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">{t.references.partner.title}</p>
            <p className="text-sm text-muted-foreground">{t.references.partner.text}</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-1">
              {t.references.partner.link} <ArrowUpRight size={14} />
            </span>
          </div>
        </a>

        <p className="text-sm text-muted-foreground max-w-2xl italic">{t.references.trust}</p>
      </div>
    </section>
  );
};

export default References;
