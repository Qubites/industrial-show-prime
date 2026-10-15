import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X } from 'lucide-react';
// The company's logo banner (white panel on blue sparks), shown as on its old site.
import logo from '@/assets/logo-banner.webp';

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // Relative to the site root, so the same links work on the front page and on referencer.html.
  const home = import.meta.env.BASE_URL;
  const navItems = [
    { label: t.nav.projects, href: `${home}#projects` },
    { label: t.nav.services, href: `${home}#services` },
    { label: t.nav.certifications, href: `${home}#certifications` },
    { label: t.nav.references, href: `${home}referencer.html` },
    { label: t.nav.about, href: `${home}#about` },
    { label: t.nav.contact, href: `${home}#contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href={home} className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="Smedefirmaet L. S. Stålmontage ApS" className="h-[70px] w-auto rounded" />
        </a>

        {/* The full menu needs ~1000px next to the logo; narrower screens use the menu button. */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'da' ? 'en' : 'da')}
            className="text-xs font-medium px-2.5 py-1.5 rounded bg-secondary text-secondary-foreground hover:bg-border transition-colors"
          >
            {lang === 'da' ? 'EN' : 'DA'}
          </button>

          <a
            href={`${home}#contact`}
            className="hidden md:inline-flex text-xs font-semibold px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t.nav.contact}
          </a>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
