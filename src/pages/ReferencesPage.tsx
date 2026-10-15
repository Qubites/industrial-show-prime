import { lazy, Suspense } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import TrustBar from '@/components/TrustBar';
import { sectors } from '@/lib/references';
import { company } from '@/lib/company';

const Showcase = lazy(() => import('@/components/Showcase'));
const Footer = lazy(() => import('@/components/Footer'));

const home = import.meta.env.BASE_URL;

const ReferencesPage = () => {
  const { lang, t } = useLanguage();
  const r = t.refPage;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-36 pb-12 bg-graphite text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-4">{r.title}</h1>
            <p className="text-white/75 max-w-2xl text-lg">{r.intro}</p>
          </div>
        </section>
        <TrustBar />

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl space-y-10">
            {sectors.map((sector) => (
              <div key={sector.name.da}>
                <div className="mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">{sector.name[lang]}</h2>
                  {sector.typical && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-semibold text-foreground">{r.typical}</span> {sector.typical[lang]}
                    </p>
                  )}
                </div>
                <div className="rounded-lg border border-border bg-card divide-y divide-border">
                  {sector.clients.map((client) => (
                    <div key={client.name} className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-x-6 gap-y-0.5 px-5 py-3.5">
                      <p className="font-semibold text-foreground">{client.name}</p>
                      <p className="text-sm text-muted-foreground sm:self-center">
                        {client.type?.[lang]}
                        {client.scope && <span className="text-foreground"> · {client.scope[lang]}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Suspense fallback={<div className="h-96" />}>
          <Showcase />
        </Suspense>

        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{r.ctaTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mb-6">{r.ctaText}</p>
            <div className="flex flex-wrap gap-3">
              <a href={company.phoneHref} className="inline-flex items-center gap-2 px-5 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                <Phone size={16} /> {r.call}
              </a>
              <a href={`${home}#contact`} className="inline-flex items-center gap-2 px-5 py-3 rounded border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/40 transition-colors">
                {r.send} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ReferencesPage;
