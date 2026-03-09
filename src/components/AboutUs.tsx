import { useLanguage } from '@/i18n/LanguageContext';
import hero2 from '@/assets/hero-2.jpg';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.about.title}</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{t.about.text1}</p>
              <p>{t.about.text2}</p>
              <p className="text-foreground font-medium">{t.about.text3}</p>
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
