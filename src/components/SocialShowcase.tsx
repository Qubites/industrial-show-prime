import { useLanguage } from '@/i18n/LanguageContext';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import hero1 from '@/assets/hero-1.jpg';
import hero3 from '@/assets/hero-3.jpg';

const socialLinks = {
  instagram: 'https://www.instagram.com/smedefirmaetl.s.staalmontage/',
  facebook: 'https://www.facebook.com/share/1Ck29gqNDQ/',
  linkedin: 'https://www.linkedin.com/company/76579691/',
};

const socialPosts = [
  { image: project1, platform: 'instagram' as const, caption: 'Stålkonstruktion til infrastrukturprojekt', date: '2025-12' },
  { image: hero1, platform: 'facebook' as const, caption: 'Svejsning på site – EXC3 certificeret', date: '2025-11' },
  { image: project2, platform: 'instagram' as const, caption: 'Industriel platform og trappekonstruktion', date: '2025-11' },
  { image: project3, platform: 'facebook' as const, caption: 'Rørstativer til forsyningsanlæg', date: '2025-10' },
  { image: hero3, platform: 'linkedin' as const, caption: 'Montagearbejde – landsdækkende projekter', date: '2025-10' },
];

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

const SocialShowcase = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.social.title}</h2>
          <p className="text-muted-foreground">{t.social.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {socialPosts.map((post, i) => {
            const PlatformIcon = platformIcons[post.platform];
            return (
              <a key={i} href={socialLinks[post.platform]} target="_blank" rel="noopener noreferrer" className="bg-card rounded-lg overflow-hidden border border-border group cursor-pointer hover:border-primary/30 transition-colors block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <PlatformIcon size={14} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{post.platform}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{post.date}</span>
                  </div>
                  <p className="text-xs text-foreground line-clamp-2">{post.caption}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialShowcase;
