import { useLanguage } from '@/i18n/LanguageContext';
import { CheckCircle2 } from 'lucide-react';
import hero2 from '@/assets/hero-2.jpg';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.about.title}</h2>
            <p className="text-primary font-medium mb-6">{t.about.subtitle}</p>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>{t.about.text1}</p>
              <p>{t.about.text2}</p>
              <p>{t.about.text3}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {t.about.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img src={hero2} alt="L. S. Stålmontage on site" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
