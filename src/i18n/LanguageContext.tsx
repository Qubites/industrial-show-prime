import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, translations } from './translations';

type Translations = typeof translations[Language];

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // ?lang=en in the link wins; otherwise the visitor's last choice, so it carries over between pages.
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (fromUrl === 'da' || fromUrl === 'en') return fromUrl;
      const saved = localStorage.getItem('lang');
      if (saved === 'da' || saved === 'en') return saved;
    } catch {
      // Storage blocked: fall back to Danish.
    }
    return 'da';
  });
  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem('lang', next);
    } catch {
      // Storage blocked: the choice just isn't remembered.
    }
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = translations[lang] as Translations;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
