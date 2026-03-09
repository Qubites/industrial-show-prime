import { useLanguage } from '@/i18n/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

const Certifications = () => {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.certifications.title}</h2>
          <p className="text-muted-foreground">{t.certifications.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.certifications.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
              <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
