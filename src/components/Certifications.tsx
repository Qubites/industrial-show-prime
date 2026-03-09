import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CheckCircle2, Shield, Award, FileText, X } from 'lucide-react';
import certifikatImage from '@/assets/certifikat-1090.webp';

const Certifications = () => {
  const { t } = useLanguage();
  const [showCert, setShowCert] = useState(false);

  return (
    <section id="certifications" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.certifications.title}</h2>
          <p className="text-muted-foreground">{t.certifications.sub}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certification items */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {t.certifications.items.map((item, i) => (
              <div key={i} className="bg-card p-5 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-[30px]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Certificate fact box */}
          <div className="bg-card border border-primary/30 rounded-lg p-6 h-fit">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t.certifications.certificate.issuer}</p>
                <p className="text-xs text-muted-foreground">Certificate</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Standard</p>
                  <p className="text-sm font-medium text-foreground">{t.certifications.certificate.standard}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Certificate nr.</p>
                  <p className="text-sm font-medium text-foreground">{t.certifications.certificate.number}</p>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">{t.certifications.certificate.company}</p>
                <p className="text-sm font-semibold text-primary">{t.certifications.certificate.validUntil}</p>
              </div>
            </div>

            <button
              onClick={() => setShowCert(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <FileText size={14} />
              {t.certifications.certificate.viewCert}
            </button>
          </div>
        </div>

        {/* Certificate modal */}
        {showCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/80 backdrop-blur-sm p-4" onClick={() => setShowCert(false)}>
            <div className="relative max-w-2xl w-full bg-card rounded-lg border border-border p-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowCert(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <X size={16} />
              </button>
              <img src={certifikatImage} alt="Nordcert Certificate 1505-CPR-CS1124" className="w-full rounded" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
