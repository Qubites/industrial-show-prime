import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react';

// One folder per project in src/assets/projects/<slug>/: 01.webp, 02.webp … plus cover.webp for the card.
const files = import.meta.glob('../assets/projects/*/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const photosOf = (slug: string) =>
  Object.keys(files)
    .filter((k) => k.startsWith(`../assets/projects/${slug}/`) && !k.endsWith('/cover.webp'))
    .sort()
    .map((k) => files[k]);

type Caption = { da: string; en: string };

// Texts and photos from the company (Kim's mails of 13/10/2026). Captions are keyed by photo number.
const projectsData: {
  slug: string;
  titleDa: string;
  titleEn: string;
  summaryDa: string;
  summaryEn: string;
  captions?: Record<number, Caption>;
}[] = [
  {
    slug: 'staalkonstruktioner',
    titleDa: 'Stålkonstruktioner',
    titleEn: 'Steel structures',
    summaryDa: 'Fremstilling og montage af stålkonstruktioner, udført i overensstemmelse med DS/EN 1090.',
    summaryEn: 'Fabrication and installation of steel structures, carried out in accordance with DS/EN 1090.',
  },
  {
    slug: 'certificeret-svejsning',
    titleDa: 'Certificeret svejsning',
    titleEn: 'Certified welding',
    summaryDa: 'Certificeret svejsning udføres efter gældende internationale og europæiske standarder.',
    summaryEn: 'Certified welding carried out to current international and European standards.',
  },
  {
    slug: 'industri',
    titleDa: 'Industri',
    titleEn: 'Industry',
    summaryDa: 'Gallerier og rørbroer til industrien, fremstillet efter DS/EN ISO 14122 og DS/EN 1090.',
    summaryEn: 'Access galleries and pipe bridges for industry, made to DS/EN ISO 14122 and DS/EN 1090.',
    captions: {
      1: { da: 'Bæring til rørbro fremstillet efter standarden DS/EN 1090.', en: 'Pipe bridge support made to DS/EN 1090.' },
      2: { da: 'Galleri fremstillet efter standarden DS/EN ISO 14122.', en: 'Access gallery made to DS/EN ISO 14122.' },
    },
  },
  {
    slug: 'trappe-og-vaern',
    titleDa: 'Trappe og værn',
    titleEn: 'Stairs and railings',
    summaryDa: 'Indvendige og udvendige trapper med værn.',
    summaryEn: 'Interior and exterior staircases with railings.',
    captions: {
      1: { da: 'Sort lakeret trappe med trin og håndliste i eg.', en: 'Black lacquered staircase with oak treads and handrail.' },
      3: {
        da: 'Indvendig trappe og værn – varmgalvaniseret, med trin og håndliste i eg.',
        en: 'Interior staircase and railing – hot-dip galvanised, with oak treads and handrail.',
      },
      4: { da: 'Udvendig flugtvejstrappe.', en: 'External escape staircase.' },
    },
  },
  {
    slug: 'vaern',
    titleDa: 'Værn',
    titleEn: 'Railings',
    summaryDa: 'Værn og gelændere i stål.',
    summaryEn: 'Steel railings and handrails.',
  },
  {
    slug: 'container-stop',
    titleDa: 'Container Stop',
    titleEn: 'Container Stop',
    summaryDa: 'For bedre sikkerhed ved bugsering, placering af kasser samt hindring af unødig slitage på underlag. Kontakt os for at høre nærmere.',
    summaryEn: 'Better safety when towing and placing containers, and less unnecessary wear on the ground. Contact us to hear more.',
  },
  {
    slug: 'renovering',
    titleDa: 'Renovering og vedligehold',
    titleEn: 'Renovation and maintenance',
    summaryDa: 'Påkørselsskader udbedret, låger renoveret og lyskasseriste udskiftet.',
    summaryEn: 'Collision damage repaired, gates renovated and light-well grates replaced.',
  },
];

const projects = projectsData.map((p) => ({ ...p, cover: files[`../assets/projects/${p.slug}/cover.webp`], photos: photosOf(p.slug) }));
type Project = (typeof projects)[number];

const Showcase = () => {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback((d: number) => {
    setOpen((o) => o && { ...o, index: (o.index + d + o.project.photos.length) % o.project.photos.length });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, step]);

  // Fetch the next photo while the current one is on screen.
  useEffect(() => {
    if (!open) return;
    const next = open.project.photos[(open.index + 1) % open.project.photos.length];
    new Image().src = next;
  }, [open]);

  const title = (p: Project) => (lang === 'da' ? p.titleDa : p.titleEn);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.showcase.title}</h2>
          <p className="text-muted-foreground">{t.showcase.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.slug} className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-colors flex flex-col">
              <button
                type="button"
                onClick={() => setOpen({ project, index: 0 })}
                className="relative block w-full aspect-[4/3] overflow-hidden"
                aria-label={`${t.showcase.viewPhotos}: ${title(project)}`}
              >
                <img
                  src={project.cover}
                  alt={title(project)}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                  <Images size={14} /> {project.photos.length}
                </span>
              </button>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{title(project)}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{lang === 'da' ? project.summaryDa : project.summaryEn}</p>
                <button
                  type="button"
                  onClick={() => setOpen({ project, index: 0 })}
                  className="inline-flex items-center self-start text-sm text-primary font-medium hover:underline gap-1"
                >
                  {t.showcase.viewPhotos} ({project.photos.length}) <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title(open.project)}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-4 p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setOpen(null)} aria-label={t.showcase.close}>
            <X size={32} />
          </button>
          {open.project.photos.length > 1 && (
            <>
              <button
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 hover:text-white"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label={t.showcase.prev}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 hover:text-white"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label={t.showcase.next}
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <img
            key={open.index}
            src={open.project.photos[open.index]}
            alt={open.project.captions?.[open.index + 1]?.[lang] ?? title(open.project)}
            className="max-h-[78vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="text-center text-white" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-medium">{open.project.captions?.[open.index + 1]?.[lang] ?? title(open.project)}</p>
            <p className="text-xs text-white/60 mt-1">
              {open.index + 1} / {open.project.photos.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;
