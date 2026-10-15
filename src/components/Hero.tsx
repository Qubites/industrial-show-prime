import { useLanguage } from '@/i18n/LanguageContext';
// The company's own photos (from its Webador draft), cropped to 16:9.
import hero1 from '@/assets/hero/hero-staalramme.webp';
import hero2 from '@/assets/hero/hero-svejsning.webp';
import hero3 from '@/assets/hero/hero-trappe.webp';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Slideshow backgrounds */}
      <div className="absolute inset-0">
        <img src={hero1} alt="Galvaniseret stålkonstruktion rejst på byggepladsen" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover hero-slide-1" />
        <img src={hero2} alt="Svejsning fra lift på byggepladsen" className="absolute inset-0 w-full h-full object-cover hero-slide-2 opacity-0" />
        <img src={hero3} alt="Ståltrappe med værn" className="absolute inset-0 w-full h-full object-cover hero-slide-3 opacity-0" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-graphite/75" />

      <div className="relative container mx-auto px-4 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-6 animate-fade-in-up">
            {t.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a
              href={`${import.meta.env.BASE_URL}referencer.html`}
              className="inline-flex items-center px-6 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
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
