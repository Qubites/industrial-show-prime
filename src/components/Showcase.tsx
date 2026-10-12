import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight, X } from 'lucide-react';
import galvanisedFrame from '@/assets/projects/galvaniseret-staalramme.webp';
import portalFrame from '@/assets/projects/staalportal.webp';
import weldingAtHeight from '@/assets/projects/svejsning-fra-lift.webp';
import stairwellBalustrade from '@/assets/projects/vaern-trappeskakt.webp';
import externalStaircase from '@/assets/projects/udvendig-staaltrappe.webp';
import containerStop from '@/assets/projects/container-stop.webp';

type FilterKey = 'all' | 'structures' | 'installation' | 'welding' | 'infrastructure' | 'utilities' | 'industrial';

// The company's own photos. Captions describe what the photo shows – no invented clients or figures.
const projectsData = [
  {
    id: 1,
    image: galvanisedFrame,
    position: 'center',
    category: 'structures' as FilterKey,
    titleDa: 'Galvaniseret stålkonstruktion',
    titleEn: 'Galvanised steel structure',
    summaryDa: 'Bærende stålramme i galvaniseret stål, rejst på byggepladsen.',
    summaryEn: 'Load-bearing frame in galvanised steel, erected on site.',
    scopeDa: 'Stålkonstruktion, montage',
    scopeEn: 'Steel structure, installation',
  },
  {
    id: 2,
    image: weldingAtHeight,
    position: 'center 30%',
    category: 'welding' as FilterKey,
    titleDa: 'Montage svejsning',
    titleEn: 'Installation welding',
    summaryDa: 'Certificeret svejsning udført fra lift direkte på byggepladsen.',
    summaryEn: 'Certified welding carried out from a lift, directly on site.',
    scopeDa: 'Certificeret svejsning, montage',
    scopeEn: 'Certified welding, installation',
  },
  {
    id: 3,
    image: portalFrame,
    position: 'center 60%',
    category: 'structures' as FilterKey,
    titleDa: 'Svejst stålportal',
    titleEn: 'Welded steel portal frame',
    summaryDa: 'Kraftig portal i svejst og malet konstruktionsstål.',
    summaryEn: 'Heavy-duty portal frame in welded and painted structural steel.',
    scopeDa: 'Svejsning, overfladebehandling',
    scopeEn: 'Welding, surface treatment',
  },
  {
    id: 4,
    image: stairwellBalustrade,
    position: 'center 55%',
    category: 'installation' as FilterKey,
    titleDa: 'Værn i trappeskakt',
    titleEn: 'Stairwell balustrade',
    summaryDa: 'Stålværn monteret i en indvendig trappeskakt.',
    summaryEn: 'Steel balustrade installed in an interior stairwell.',
    scopeDa: 'Montage, værn og gelænder',
    scopeEn: 'Installation, balustrades and handrails',
  },
  {
    id: 5,
    image: externalStaircase,
    position: 'center 70%',
    category: 'installation' as FilterKey,
    titleDa: 'Udvendig ståltrappe',
    titleEn: 'External steel staircase',
    summaryDa: 'Galvaniseret trappe monteret langs facaden i en baggård.',
    summaryEn: 'Galvanised staircase installed along a facade in a courtyard.',
    scopeDa: 'Montage, galvaniseret stål',
    scopeEn: 'Installation, galvanised steel',
  },
  {
    id: 6,
    image: containerStop,
    position: 'center',
    category: 'industrial' as FilterKey,
    titleDa: 'L.S Container STOP',
    titleEn: 'L.S Container STOP',
    summaryDa: 'Vores eget produkt: containerstop for bedre sikkerhed ved bugsering, ordnet placering af containere og mindre slid på underlaget.',
    summaryEn: 'Our own product: container stops for safer towing, orderly placement of containers and less wear on the ground.',
    scopeDa: 'Eget produkt, fremstilling',
    scopeEn: 'Own product, fabrication',
  },
];

const filterOrder: FilterKey[] = ['all', 'structures', 'installation', 'welding', 'infrastructure', 'utilities', 'industrial'];
// Only offer filters that have photos behind them.
const filterKeys = filterOrder.filter((key) => key === 'all' || projectsData.some((p) => p.category === key));

const Showcase = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [open, setOpen] = useState<(typeof projectsData)[number] | null>(null);

  const filtered = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.showcase.title}</h2>
          <p className="text-muted-foreground">{t.showcase.sub}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
                filter === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-border'
              }`}
            >
              {t.showcase.filters[key]}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const title = lang === 'da' ? project.titleDa : project.titleEn;
            return (
              <div key={project.id} className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpen(project)}
                  className="block w-full aspect-[4/3] overflow-hidden"
                  aria-label={`${t.showcase.viewProject}: ${title}`}
                >
                  <img
                    src={project.image}
                    alt={title}
                    loading="lazy"
                    style={{ objectPosition: project.position }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {t.showcase.filters[project.category]}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {lang === 'da' ? project.summaryDa : project.summaryEn}
                  </p>
                  <p className="text-xs text-steel-light mb-4">
                    {lang === 'da' ? project.scopeDa : project.scopeEn}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(project)}
                    className="inline-flex items-center text-sm text-primary font-medium hover:underline gap-1"
                  >
                    {t.showcase.viewProject} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center gap-4 p-4"
          onClick={() => setOpen(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setOpen(null)} aria-label="Luk">
            <X size={32} />
          </button>
          <img
            src={open.image}
            alt={lang === 'da' ? open.titleDa : open.titleEn}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="text-white text-sm font-medium">{lang === 'da' ? open.titleDa : open.titleEn}</p>
        </div>
      )}
    </section>
  );
};

export default Showcase;
