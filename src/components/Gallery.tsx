import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { X } from 'lucide-react';

// Import all gallery images
import g01 from '@/assets/gallery/gallery-01.png';
import g02 from '@/assets/gallery/gallery-02.png';
import g03 from '@/assets/gallery/gallery-03.png';
import g04 from '@/assets/gallery/gallery-04.png';
import g05 from '@/assets/gallery/gallery-05.png';
import g06 from '@/assets/gallery/gallery-06.png';
import g07 from '@/assets/gallery/gallery-07.png';
import g08 from '@/assets/gallery/gallery-08.png';
import g09 from '@/assets/gallery/gallery-09.png';
import g10 from '@/assets/gallery/gallery-10.png';

const images = [g01, g02, g03, g04, g05, g06, g07, g08, g09, g10];

const Gallery = () => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.gallery.title}</h2>
          <p className="text-muted-foreground">{t.gallery.sub}</p>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg border border-border hover:border-primary/40 transition-colors"
              onClick={() => setLightbox(i)}
            >
              <img
                src={src}
                alt={`${t.gallery.title} ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <img
            src={images[lightbox]}
            alt={`${t.gallery.title} ${lightbox + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
