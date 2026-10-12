import { useState, useEffect } from 'react';
import { Feather, Heart, Sparkles } from 'lucide-react';
import type { LoveConfig } from '../config';

interface Props {
  letter: LoveConfig['letter'];
  recipientName: string;
  senderName: string;
}

export function HeartfeltLetter({ letter, recipientName, senderName }: Props) {
  const fullText = letter.content;
  const [displayedText, setDisplayedText] = useState('');
  const [isDoneTyping, setIsDoneTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Typewriter effect triggered when letter comes into view or mounted
  useEffect(() => {
    let timeoutId: any;
    let currentIndex = 0;

    const startTyping = () => {
      setHasStarted(true);
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsDoneTyping(true);
        }
      }, 28); // 28ms typing speed

      return () => clearInterval(interval);
    };

    // Small delay before starting typewriter
    timeoutId = setTimeout(startTyping, 400);

    return () => clearTimeout(timeoutId);
  }, [fullText]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsDoneTyping(true);
  };

  return (
    <section id="surat" className="relative py-14 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Decorative Warm Letter Parchment */}
      <div className="relative bg-[#FFFDF9] border border-amber-900/10 rounded-2xl p-6 sm:p-9 shadow-lg shadow-rose-950/5">
        {/* Envelope stamp / wax seal motif */}
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
              <Feather className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Surat Pribadi
              </p>
              <p className="text-xs font-serif-romantic text-stone-700 italic">
                Khusus untuk {recipientName}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

        {/* Heartfelt Typewriter Body */}
        <div className="relative text-stone-700 leading-relaxed font-sans-warm text-sm sm:text-base min-h-[160px]">
          <p className="whitespace-pre-line">
            {displayedText}
            {!isDoneTyping && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-rose-500 animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* Skip button if still typing */}
        {!isDoneTyping && hasStarted && (
          <div className="mt-4 pt-2 text-right">
            <button
              onClick={handleSkipTyping}
              className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
            >
              Lewati ketikan & baca semua ⏩
            </button>
          </div>
        )}

        {/* Closing Signature */}
        {isDoneTyping && (
          <div className="mt-8 pt-5 border-t border-amber-900/10 flex flex-col items-end text-right animate-in fade-in duration-500">
            <p className="text-xs text-stone-500 font-sans-warm">
              {letter.closing}
            </p>
            <p className="font-script text-2xl sm:text-3xl text-rose-600 mt-1">
              {senderName}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
