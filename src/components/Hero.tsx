import { useLanguage } from '@/i18n/LanguageContext';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Slideshow backgrounds */}
      <div className="absolute inset-0">
        <img src={hero1} alt="Steel fabrication" className="absolute inset-0 w-full h-full object-cover hero-slide-1" />
        <img src={hero2} alt="Steel installation" className="absolute inset-0 w-full h-full object-cover hero-slide-2 opacity-0" />
        <img src={hero3} alt="Certified welding" className="absolute inset-0 w-full h-full object-cover hero-slide-3 opacity-0" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-graphite/75" />

      <div className="relative container mx-auto px-4 pt-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground mb-6 animate-fade-in-up">
            {t.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-steel-light max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
