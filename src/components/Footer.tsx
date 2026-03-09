import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-graphite border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-3">L. S. STÅLMONTAGE ApS</h3>
            <p className="text-sm text-muted-foreground">CVR: 70963116</p>
            <p className="text-sm text-muted-foreground">P-nr: 1007967612</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sydvestvej 111 D</p>
            <p className="text-sm text-muted-foreground">2600 Glostrup, Denmark</p>
            <p className="text-sm text-muted-foreground mt-2">+45 43 45 11 49</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.projects}</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.services}</a>
            <a href="#certifications" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.certifications}</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Facebook</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-wrap justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SMEDEFIRMAET L. S. STÅLMONTAGE ApS. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
