import { useState, useRef } from 'react';
import { Heart, Sliders, Volume2, Sparkles, ChevronDown } from 'lucide-react';
import { defaultConfig, type LoveConfig } from './config';
import { YouTubeMusicPlayer, type MusicPlayerHandle } from './components/YouTubeMusicPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { PolaroidGallery } from './components/PolaroidGallery';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { ProposalMoment } from './components/ProposalMoment';
import { SettingsDrawer } from './components/SettingsDrawer';

export default function App() {
  const [config, setConfig] = useState<LoveConfig>(defaultConfig);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoPlayTriggered, setAutoPlayTriggered] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  // Triggered when user taps "Buka" button on Hero
  const handleOpenLetter = () => {
    setAutoPlayTriggered(true);
    // Start music playback from user interaction (bypassing mobile autoplay restrictions)
    if (musicPlayerRef.current) {
      musicPlayerRef.current.play();
    }

    // Smooth scroll down to memories gallery
    const galeriEl = document.getElementById('galeri');
    if (galeriEl) {
      galeriEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Color theme classes mapping
  const getThemeClasses = () => {
    switch (config.theme) {
      case 'maroon-gold':
        return {
          bg: 'bg-[#FCF9F7]',
          heroGrad: 'from-amber-100/60 via-rose-50 to-stone-50',
          accent: 'text-rose-900',
          buttonPrimary: 'bg-rose-900 hover:bg-rose-950 text-amber-100 shadow-rose-950/20',
        };
      case 'lavender-white':
        return {
          bg: 'bg-[#FAF8FF]',
          heroGrad: 'from-purple-100/60 via-pink-50 to-purple-50/30',
          accent: 'text-purple-700',
          buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20',
        };
      case 'pastel-pink':
      default:
        return {
          bg: 'bg-[#FFF8F6]',
          heroGrad: 'from-rose-100/70 via-pink-50 to-[#FFF8F6]',
          accent: 'text-rose-600',
          buttonPrimary: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-rose-500/25',
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.bg} relative text-stone-800 transition-colors duration-500 font-sans-warm overflow-x-hidden selection:bg-rose-200 selection:text-rose-900`}>
      {/* Floating Gentle Particle Background (Hearts & Starlight) */}
      <FloatingParticles />

      {/* Embedded YouTube Audio Controller */}
      <YouTubeMusicPlayer
        ref={musicPlayerRef}
        youtubeConfig={config.youtube}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        autoPlayTriggered={autoPlayTriggered}
      />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/75 border-b border-rose-100/80 transition-all">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            className="text-sm sm:text-base font-serif-romantic font-semibold tracking-tight text-stone-900 truncate hover:text-rose-600 transition-colors"
          >
            Surat Untuk Raissa 💌
          </a>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-stone-600">
            <a href="#galeri" className="hover:text-rose-600 transition-colors whitespace-nowrap">
              Kenangan
            </a>
            <a href="#surat" className="hover:text-rose-600 transition-colors whitespace-nowrap">
              Ungkapan Hati
            </a>
            <a href="#pertanyaan" className="hover:text-rose-600 transition-colors whitespace-nowrap">
              Pertanyaan
            </a>
          </nav>

          {/* Primary Action (Quick Personalization / Test Drawer) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200/80 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer focus-visible:outline-rose-500"
              title="Sesuaikan nama, lagu, dan tema"
            >
              <Sliders className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden xs:inline">Sesuaikan</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. LAYAR PEMBUKA (HERO SECTION) */}
        <section
          id="hero"
          className={`relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 bg-gradient-to-b ${themeClasses.heroGrad}`}
        >
          {/* Gentle Pulsing Soft Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-rose-300/30 rounded-full blur-3xl pointer-events-none animate-glow"
          />

          <div className="relative max-w-lg mx-auto z-10 flex flex-col items-center">
            {/* Romantic Envelope Badge */}
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-md shadow-rose-900/10 border border-rose-200/60 text-rose-500 animate-float">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
            </div>

            {/* Greeting Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-romantic font-bold text-stone-900 tracking-tight leading-tight px-2">
              {config.hero.greeting}
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-md font-sans-warm leading-relaxed px-2">
              {config.hero.subtitle}
            </p>

            {/* Main Action Button ("Buka" -> Starts music & scrolls down smoothly) */}
            <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-xs">
              <button
                onClick={handleOpenLetter}
                className={`w-full py-4 px-8 text-base font-semibold rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 focus-visible:outline-rose-500 ${themeClasses.buttonPrimary}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{config.hero.openButtonText}</span>
              </button>

              <span className="text-xs text-stone-400 flex items-center gap-1 font-medium">
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{config.hero.hintSound}</span>
              </span>
            </div>

            {/* Scroll indicator */}
            <a
              href="#galeri"
              className="mt-12 inline-flex flex-col items-center text-stone-400 hover:text-stone-600 transition-colors text-xs"
              aria-label="Gulir ke bawah"
            >
              <span className="text-[11px] mb-1">Gulir ke bawah</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </section>

        {/* 2. GALERI KENANGAN (FOTO MURNI, TANPA TEKS) */}
        <PolaroidGallery memories={config.memories} />

        {/* 3. BAGIAN UNGKAPAN PERASAAN (SURAT CINTA DENGAN TYPEWRITER) */}
        <HeartfeltLetter
          letter={config.letter}
          recipientName={config.recipientName}
          senderName={config.senderName}
        />

        {/* 4. MOMEN PERTANYAAN (KLIMAKS DENGAN EXPANDING MAU BUTTON) */}
        <ProposalMoment
          recipientName={config.recipientName}
          senderName={config.senderName}
          proposal={config.proposal}
        />
      </main>

      {/* FOOTER */}
      <footer className="relative py-12 px-4 text-center border-t border-rose-100/60 bg-white/40 backdrop-blur-xs">
        <p className="text-xs sm:text-sm text-stone-600 flex items-center justify-center gap-1.5 font-medium">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          <span>oleh</span>
          <strong className="text-stone-900 font-semibold">{config.senderName}</strong>
        </p>
        <p className="text-[11px] text-stone-400 mt-1">
          Sebuah ungkapan tulus yang terukir selamanya.
        </p>
      </footer>

      {/* Settings / Personalization Drawer */}
      <SettingsDrawer
        config={config}
        onUpdateConfig={setConfig}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
