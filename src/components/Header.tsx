import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.certifications, href: '#certifications' },
    { label: t.nav.references, href: '#references' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="L. S. Stålmontage" className="h-10 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
            href="#contact"
            className="hidden md:inline-flex text-xs font-semibold px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t.nav.contact}
          </a>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
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
