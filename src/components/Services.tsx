import { useLanguage } from '@/i18n/LanguageContext';
import { Compass, Lightbulb, Building2, Wrench, Flame, Users } from 'lucide-react';

const icons = [Compass, Lightbulb, Building2, Wrench, Flame, Users];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground">{t.services.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <Icon size={24} className="text-primary mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <p className="text-xs font-medium text-primary">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
