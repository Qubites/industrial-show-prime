import { useLanguage } from '@/i18n/LanguageContext';
import { Building } from 'lucide-react';

const References = () => {
  const { t } = useLanguage();

  return (
    <section id="references" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.references.title}</h2>
          <p className="text-muted-foreground">{t.references.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {t.references.clients.map((client, i) => (
            <div key={i} className="flex items-center gap-3 bg-card p-5 rounded-lg border border-border">
              <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                <Building size={18} className="text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">{client}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl italic">{t.references.trust}</p>
      </div>
    </section>
  );
};

export default References;
