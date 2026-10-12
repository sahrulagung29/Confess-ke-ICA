import { useMemo } from 'react';

interface Particle {
  id: number;
  type: 'heart' | 'sparkle' | 'circle';
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export function FloatingParticles() {
  // Generate stable particles on mount
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fbcfe8', '#f472b6'];
    const types: ('heart' | 'sparkle' | 'circle')[] = ['heart', 'heart', 'sparkle', 'circle'];

    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      left: `${(i * 4.6 + Math.random() * 3) % 96}%`,
      size: Math.floor(Math.random() * 12) + 10, // 10px to 22px
      duration: Math.floor(Math.random() * 12) + 14, // 14s to 26s slow drift
      delay: -(Math.random() * 20), // start at random heights
      opacity: 0.25 + Math.random() * 0.45,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-40px] inline-flex items-center justify-center will-change-transform"
          style={{
            left: p.left,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            animation: `driftUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' && '♥'}
          {p.type === 'sparkle' && '✦'}
          {p.type === 'circle' && '•'}
        </span>
      ))}

      <style>{`
        @keyframes driftUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--p-opacity, 0.4);
          }
          90% {
            opacity: var(--p-opacity, 0.4);
          }
          100% {
            transform: translateY(-110vh) translateX(35px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
