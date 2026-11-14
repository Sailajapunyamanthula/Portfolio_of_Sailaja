import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  violet: boolean;
}

/** Sparse drifting particles. Stops when the tab is hidden and draws one still frame for reduced motion. */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;

    const seed = () => {
      const count = Math.min(70, Math.max(24, Math.floor((width * height) / 26000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.6 + Math.random() * 1.3,
        a: 0.18 + Math.random() * 0.4,
        violet: Math.random() > 0.55,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(false);
    };

    const draw = (advance: boolean) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (advance) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.violet ? `rgba(167,139,250,${p.a})` : `rgba(0,229,255,${p.a})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 8800) {
            ctx.strokeStyle = `rgba(120,140,200,${0.1 * (1 - dist2 / 8800)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      if (!running) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />;
}

/** Fixed, non-interactive backdrop: base colour, grid, soft gradient glows and particles. */
export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink" aria-hidden="true">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -left-[12%] top-[-14%] h-[58vmax] w-[58vmax] animate-drift rounded-full bg-violet/[0.14] blur-[120px]" />
      <div
        className="absolute -right-[14%] top-[22%] h-[52vmax] w-[52vmax] animate-drift rounded-full bg-cyan/[0.09] blur-[130px]"
        style={{ animationDelay: '-9s' }}
      />
      <div
        className="absolute bottom-[-20%] left-[18%] h-[46vmax] w-[46vmax] animate-drift rounded-full bg-blue-600/[0.10] blur-[130px]"
        style={{ animationDelay: '-15s' }}
      />
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
    </div>
  );
}
