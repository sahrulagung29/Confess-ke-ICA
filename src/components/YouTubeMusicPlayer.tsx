import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music2, Disc3 } from 'lucide-react';
import type { LoveConfig } from '../config';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
}

interface Props {
  youtubeConfig: LoveConfig['youtube'];
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  autoPlayTriggered: boolean;
}

export const YouTubeMusicPlayer = forwardRef<MusicPlayerHandle, Props>(({
  youtubeConfig,
  isPlaying,
  setIsPlaying,
}, ref) => {
  const [isMuted, setIsMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const playerRef = useRef<any>(null);
  const containerId = 'youtube-audio-player-element';

  // Expose imperative play/pause
  useImperativeHandle(ref, () => ({
    play: () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch (e) {
          console.warn('Could not play video:', e);
        }
      }
    },
    pause: () => {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        try {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } catch (e) {
          console.warn('Could not pause video:', e);
        }
      }
    },
  }));

  // Load YouTube IFrame API script
  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player(containerId, {
          height: '1',
          width: '1',
          videoId: youtubeConfig.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: youtubeConfig.loop ? 1 : 0,
            playlist: youtubeConfig.videoId,
            start: youtubeConfig.startSeconds,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              setPlayerReady(true);
              event.target.setVolume(85);
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0 && youtubeConfig.loop) {
                event.target.seekTo(youtubeConfig.startSeconds);
                event.target.playVideo();
              }
            },
            onError: (err: any) => {
              console.warn('YouTube Player error:', err);
            },
          },
        });
      } catch (err) {
        console.warn('Error setting up YT.Player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (isMounted) initializePlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [youtubeConfig.videoId, youtubeConfig.startSeconds, youtubeConfig.loop]);

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn('Toggle play error:', e);
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Hidden container where YouTube iframe loads */}
      <div className="fixed -top-[9999px] -left-[9999px] pointer-events-none opacity-0 overflow-hidden">
        <div id={containerId} />
      </div>

      {/* Floating Bottom Music Bar (Compact, fits thumb zone, ≤15% viewport height) */}
      <aside 
        aria-label="Pemutar musik romantis"
        className={`fixed z-40 bottom-4 right-4 max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out select-none ${
          isMinimized ? 'w-auto' : 'w-72 sm:w-80'
        }`}
      >
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-rose-200/80 shadow-lg shadow-rose-950/10 rounded-2xl p-2.5 flex items-center justify-between gap-3 text-stone-800">
          {/* Disc / Music Icon */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Perbesar pemutar' : 'Perkecil pemutar'}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-rose-500 rounded-lg p-0.5"
          >
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20">
              <Disc3 className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
              )}
            </div>

            {!isMinimized && (
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                  <Music2 className="w-3 h-3 shrink-0" />
                  {isPlaying ? 'Memutar Lagu' : 'Musik Jeda'}
                </span>
                <span className="text-xs font-medium text-stone-800 truncate max-w-[130px] sm:max-w-[150px]">
                  {youtubeConfig.songTitle}
                </span>
                <span className="text-[10px] text-stone-400 truncate max-w-[130px]">
                  {youtubeConfig.artist}
                </span>
              </div>
            )}
          </button>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Play / Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-600 flex items-center justify-center transition-all cursor-pointer focus-visible:outline-rose-500"
              aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Mute Button (Only shown when expanded) */}
            {!isMinimized && (
              <button
                onClick={handleToggleMute}
                className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer focus-visible:outline-rose-500"
                aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Small Hint Toast */}
        {!isPlaying && playerReady && (
          <div className="text-right mt-1">
            <span className="inline-block text-[10px] text-stone-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-stone-200 shadow-xs">
              Nyalakan suara ya 🎧
            </span>
          </div>
        )}
      </aside>
    </>
  );
});

YouTubeMusicPlayer.displayName = 'YouTubeMusicPlayer';
