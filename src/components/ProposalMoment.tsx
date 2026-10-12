import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import type { LoveConfig } from '../config';

interface Props {
  recipientName: string;
  senderName: string;
  proposal: LoveConfig['proposal'];
}

export function ProposalMoment({ recipientName, senderName, proposal }: Props) {
  const [noClicks, setNoClicks] = useState<number>(0);
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);

  // Trigger romantic multi-stage confetti and hearts
  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#e11d48', '#f43f5e', '#fda4af'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#e11d48', '#f43f5e', '#fda4af'],
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#fbbf24', '#f43f5e', '#ec4899'],
      });
    }, 500);
  };

  const handleYes = () => {
    setHasAccepted(true);
    triggerCelebration();
  };

  const handleNo = () => {
    setNoClicks((prev) => prev + 1);
  };

  // Threshold when "Pikir-pikir dulu" disappears completely
  const isNoButtonGone = noClicks >= 3;

  // Dynamic playful hint text
  const currentHint =
    noClicks > 0
      ? proposal.playfulHints[Math.min(noClicks - 1, proposal.playfulHints.length - 1)]
      : null;

  // Sizing styles for "Mau" based on click counts
  const getYesButtonClasses = () => {
    if (noClicks === 0) {
      return 'w-full sm:w-auto px-8 py-3.5 text-base';
    }
    if (noClicks === 1) {
      return 'w-full sm:w-auto px-10 py-4 text-lg shadow-xl';
    }
    if (noClicks === 2) {
      return 'w-full px-10 py-5 text-xl shadow-2xl';
    }
    // After 3+ clicks, fills prominent view comfortably
    return 'w-full py-6 text-xl sm:text-2xl font-bold shadow-2xl ring-4 ring-rose-300 animate-pulse';
  };

  // WhatsApp reply link
  const getWhatsAppUrl = () => {
    const rawNumber = proposal.yesResponse.whatsappNumber?.replace(/[^0-9]/g, '') || '';
    const message = encodeURIComponent(
      proposal.yesResponse.whatsappMessage || `Hai ${senderName}! Aku mau 💕`
    );
    return rawNumber
      ? `https://wa.me/${rawNumber}?text=${message}`
      : `https://wa.me/?text=${message}`;
  };

  return (
    <section id="pertanyaan" className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto text-center">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative bg-white/95 backdrop-blur-sm border border-rose-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-rose-950/10">
        {!hasAccepted ? (
          <div>
            {/* Pulsing floating heart badge */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-rose-500/25 animate-float">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            {/* Question Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-romantic font-semibold text-stone-900 leading-tight">
              {proposal.question}
            </h2>

            {/* Playful hint text if clicked */}
            {currentHint && (
              <p className="mt-4 text-sm font-semibold text-rose-600 animate-in fade-in duration-300">
                {currentHint}
              </p>
            )}

            {/* Decision Buttons Container */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-300">
              {/* TOMBOL "MAU" (Membesar bertahap & tidak kabur) */}
              <button
                onClick={handleYes}
                className={`bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-2xl shadow-lg shadow-rose-500/30 transition-all duration-400 ease-out cursor-pointer active:scale-98 flex items-center justify-center gap-2 focus-visible:outline-rose-500 ${getYesButtonClasses()}`}
              >
                <Sparkles className="w-5 h-5 shrink-0" />
                <span>{proposal.yesButtonText}</span>
              </button>

              {/* TOMBOL "PIKIR-PIKIR DULU" (Menghilang fade-out setelah 3 klik) */}
              {!isNoButtonGone ? (
                <button
                  onClick={handleNo}
                  className={`w-full sm:w-auto px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-sm rounded-2xl border border-stone-200 transition-all duration-300 cursor-pointer active:scale-95 focus-visible:outline-stone-400 ${
                    noClicks === 2 ? 'opacity-60 scale-90' : noClicks === 1 ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <span>{proposal.noButtonText}</span>
                </button>
              ) : (
                <div
                  aria-hidden="true"
                  className="transition-opacity duration-500 opacity-0 pointer-events-none scale-0 h-0 w-0"
                />
              )}
            </div>

            {isNoButtonGone && (
              <p className="mt-5 text-xs text-stone-400 animate-in fade-in duration-500">
                Tombol pikir-pikirnya sudah menghilang 🙈 Sekarang tinggal tombol manis ini...
              </p>
            )}
          </div>
        ) : (
          /* STATE: ACCEPTED / DIA JAWAB MAU */
          <div className="animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              {proposal.yesResponse.badgeText}
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif-romantic font-semibold text-stone-900">
              {proposal.yesResponse.title}
            </h3>

            <p className="mt-4 text-stone-700 leading-relaxed text-sm sm:text-base">
              {proposal.yesResponse.message}
            </p>

            <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col gap-3">
              {/* WhatsApp Reply Button */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-xl shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Kirim Jawaban ke WhatsApp 💌</span>
              </a>

              {/* Re-trigger Confetti */}
              <button
                onClick={triggerCelebration}
                className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hujani Hati & Confetti Lagi ✨</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
