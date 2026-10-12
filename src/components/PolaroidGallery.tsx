import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MemoryPhoto } from '../config';

interface Props {
  memories: MemoryPhoto[];
}

const EXTENSIONS = ['.jpeg', '.jpg', '.JPEG', '.JPG', '.png', '.PNG', '.webp'];

function SmartImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const normalizedInitial = src.startsWith('/') ? '.' + src : src;
  const [currentSrc, setCurrentSrc] = useState(normalizedInitial);
  const [tryIndex, setTryIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const handleError = () => {
    const basePath = normalizedInitial.replace(/\.[^/.]+$/, '');
    if (tryIndex < EXTENSIONS.length) {
      const nextSrc = `${basePath}${EXTENSIONS[tryIndex]}`;
      setTryIndex((prev) => prev + 1);
      setCurrentSrc(nextSrc);
    } else {
      setHasFailedAll(true);
    }
  };

  if (hasFailedAll) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-rose-50 text-rose-300 text-4xl">
        🌸
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
}

export function PolaroidGallery({ memories }: Props) {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    if (idx < 0 || idx >= memories.length) return;
    setCurrentIndex(idx);
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => scrollToIndex(currentIndex + 1);
  const handlePrev = () => scrollToIndex(currentIndex - 1);

  return (
    <section id="galeri" className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* SWIPE CAROUSEL (Clean, pure photos only, supports both .jpg and .jpeg automatically) */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const newIndex = Math.round(el.scrollLeft / (el.clientWidth * 0.85));
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < memories.length) {
              setCurrentIndex(newIndex);
            }
          }}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-3 px-3 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {memories.map((photo, idx) => {
            const rotationDegree = photo.rotation ?? (idx % 2 === 0 ? -1.8 : 1.8);
            return (
              <div
                key={photo.id}
                className="shrink-0 w-[82vw] sm:w-[320px] snap-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  transform: `rotate(${rotationDegree}deg)`,
                }}
                onClick={() => setActivePhoto(photo)}
              >
                {/* Polaroid Frame without text */}
                <div className="relative bg-white p-3.5 pb-5 rounded-sm shadow-md shadow-rose-950/10 border border-stone-200/80 transition-shadow hover:shadow-xl">
                  {/* Subtle translucent washi tape on top */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-200/70 border-t border-b border-rose-300/40 backdrop-blur-xs transform -rotate-1 shadow-xs z-10 opacity-85"
                  />

                  {/* Clean photo slot with auto .jpeg / .jpg fallback */}
                  <div className="relative aspect-square w-full overflow-hidden bg-stone-100 rounded-xs">
                    <SmartImage
                      src={photo.image}
                      alt={`Foto kenangan ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrows & Dots */}
        <div className="flex items-center justify-between max-w-xs mx-auto mt-2 px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-600 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {memories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === i ? 'w-5 bg-rose-500' : 'w-1.5 bg-stone-300 hover:bg-rose-300'
                }`}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === memories.length - 1}
            className="w-8 h-8 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-600 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-sm w-full bg-white p-3 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-stone-900/70 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-square w-full rounded-md overflow-hidden bg-stone-100">
              <SmartImage
                src={activePhoto.image}
                alt="Kenangan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
