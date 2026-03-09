import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

type FilterKey = 'all' | 'structures' | 'installation' | 'welding' | 'infrastructure' | 'utilities' | 'industrial';

const projectsData = [
  {
    id: 1,
    image: project1,
    category: 'infrastructure' as FilterKey,
    titleDa: 'Stålbro – Infrastrukturprojekt',
    titleEn: 'Steel Bridge – Infrastructure Project',
    summaryDa: 'Produktion og montage af bærende stålkonstruktion til broprojekt. EXC3-certificeret svejsning med fuld dokumentation.',
    summaryEn: 'Fabrication and installation of load-bearing steel structure for bridge project. EXC3-certified welding with full documentation.',
    scopeDa: 'Stålkonstruktion, montage, svejsning, dokumentation',
    scopeEn: 'Steel structure, installation, welding, documentation',
  },
  {
    id: 2,
    image: project2,
    category: 'industrial' as FilterKey,
    titleDa: 'Industriel ståltrappeog platform',
    titleEn: 'Industrial Steel Staircase & Platform',
    summaryDa: 'Design, produktion og installation af adgangsplatform og trappekonstruktion til industrianlæg.',
    summaryEn: 'Design, fabrication and installation of access platform and staircase for industrial facility.',
    scopeDa: 'Stålkonstruktion, montage, overfladebehandling',
    scopeEn: 'Steel structure, installation, surface treatment',
  },
  {
    id: 3,
    image: project3,
    category: 'utilities' as FilterKey,
    titleDa: 'Rørstativer til forsyningsanlæg',
    titleEn: 'Pipe Rack for Utility Plant',
    summaryDa: 'Levering af stålrørstativer og supportkonstruktioner til forsyningsinfrastruktur. EXC2-certificeret.',
    summaryEn: 'Delivery of steel pipe racks and support structures for utility infrastructure. EXC2-certified.',
    scopeDa: 'Stålproduktion, montage, kvalitetssikring',
    scopeEn: 'Steel fabrication, installation, quality assurance',
  },
];

const Showcase = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filterKeys: FilterKey[] = ['all', 'structures', 'installation', 'welding', 'infrastructure', 'utilities', 'industrial'];

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
          {filtered.map((project) => (
            <div key={project.id} className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-colors">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={lang === 'da' ? project.titleDa : project.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {t.showcase.filters[project.category]}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                  {lang === 'da' ? project.titleDa : project.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {lang === 'da' ? project.summaryDa : project.summaryEn}
                </p>
                <p className="text-xs text-steel-light mb-4">
                  {lang === 'da' ? project.scopeDa : project.scopeEn}
                </p>
                <button className="inline-flex items-center text-sm text-primary font-medium hover:underline gap-1">
                  {t.showcase.viewProject} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
