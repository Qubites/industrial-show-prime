import { useLanguage } from '@/i18n/LanguageContext';
import { Award, Shield, Flame, Factory, Clock } from 'lucide-react';

const TrustBar = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Award, label: t.trust.experience },
    { icon: Shield, label: t.trust.certified },
    { icon: Flame, label: t.trust.welding },
    { icon: Factory, label: t.trust.workshop },
    { icon: Clock, label: t.trust.service },
  ];

  return (
    <section className="bg-secondary border-y border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm text-secondary-foreground">
              <item.icon size={18} className="text-primary flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
