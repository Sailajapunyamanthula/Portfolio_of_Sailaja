import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Node3D {
  x: number;
  y: number;
  z: number;
  /** 0 at the bottom of the sphere, 1 at the top. Drives the cyan to violet blend. */
  tone: number;
}

const NODE_COUNT = 88;
const CYAN = [0, 229, 255] as const;
const VIOLET = [139, 92, 246] as const;

/** Evenly spaced points on a sphere (Fibonacci lattice). */
function buildNodes(count: number): Node3D[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius, tone: (y + 1) / 2 };
  });
}

/** Connects every node to its three nearest neighbours. Distances never change under rotation, so this runs once. */
function buildEdges(nodes: Node3D[], neighbours = 3): Array<[number, number]> {
  const seen = new Set<string>();
  const edges: Array<[number, number]> = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, neighbours)
      .forEach(({ j }) => {
        const lo = Math.min(i, j);
        const hi = Math.max(i, j);
        const key = `${lo}-${hi}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([lo, hi]);
        }
      });
  });
  return edges;
}

const mix = (t: number) => {
  const r = Math.round(VIOLET[0] + (CYAN[0] - VIOLET[0]) * t);
  const g = Math.round(VIOLET[1] + (CYAN[1] - VIOLET[1]) * t);
  const b = Math.round(VIOLET[2] + (CYAN[2] - VIOLET[2]) * t);
  return `${r},${g},${b}`;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Signal {
  edge: number;
  t: number;
  speed: number;
}

/**
 * A slowly rotating network sphere drawn on a canvas. Leans toward the pointer,
 * pauses when off-screen or when the tab is hidden, and renders a single still frame for reduced motion.
 */
export function NeuralOrb({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return;

    const nodes = buildNodes(NODE_COUNT);
    const edges = buildEdges(nodes);
    const signals: Signal[] = Array.from({ length: 6 }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
    }));

    let size = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;
    let rotY = 0.6;
    const baseTilt = 0.38;
    let lean = { x: 0, y: 0 };
    let leanTarget = { x: 0, y: 0 };
    let startedAt = 0;

    const draw = (now: number) => {
      const intro = reduced ? 1 : easeOut(Math.min(1, (now - startedAt) / 1600));
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.34;
      const fov = 3.2;

      const halo = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.45);
      halo.addColorStop(0, `rgba(139,92,246,${0.3 * intro})`);
      halo.addColorStop(0.55, `rgba(0,229,255,${0.07 * intro})`);
      halo.addColorStop(1, 'rgba(8,11,18,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, size, size);

      const body = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R * 1.02);
      body.addColorStop(0, `rgba(30,42,78,${0.55 * intro})`);
      body.addColorStop(1, 'rgba(10,15,26,0)');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.06 * intro})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const ry = rotY + lean.y;
      const rx = baseTilt + lean.x;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      const projected = nodes.map((n) => {
        const x = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y = n.y * cosX - z1 * sinX;
        const z = n.y * sinX + z1 * cosX;
        const scale = fov / (fov - z);
        return { sx: cx + x * R * scale * (0.9 + 0.1 * intro), sy: cy + y * R * scale * (0.9 + 0.1 * intro), z, scale, tone: n.tone };
      });

      ctx.lineWidth = 0.9;
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.z + pb.z) / 2;
        const alpha = (0.07 + 0.34 * ((depth + 1) / 2)) * intro;
        ctx.strokeStyle = `rgba(${mix((pa.tone + pb.tone) / 2)},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      const order = projected.map((_, i) => i).sort((i, j) => projected[i].z - projected[j].z);
      for (const i of order) {
        const p = projected[i];
        const depth = (p.z + 1) / 2;
        const alpha = (0.35 + 0.65 * depth) * intro;
        const color = mix(p.tone);
        if (p.z > 0.3) {
          ctx.fillStyle = `rgba(${color},${0.14 * intro})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 7 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, (1.3 + 1.5 * depth) * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        for (const s of signals) {
          const [a, b] = edges[s.edge];
          const pa = projected[a];
          const pb = projected[b];
          const x = pa.sx + (pb.sx - pa.sx) * s.t;
          const y = pa.sy + (pb.sy - pa.sy) * s.t;
          const fade = Math.sin(Math.PI * s.t) * intro;
          ctx.fillStyle = `rgba(220,250,255,${0.9 * fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(0,229,255,${0.22 * fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let last = 0;
    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(40, last ? now - last : 16);
      last = now;
      rotY += dt * 0.00019;
      lean.x += (leanTarget.x - lean.x) * 0.05;
      lean.y += (leanTarget.y - lean.y) * 0.05;
      for (const s of signals) {
        s.t += s.speed;
        if (s.t >= 1) {
          s.t = 0;
          s.edge = Math.floor(Math.random() * edges.length);
        }
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || !onScreen || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      size = Math.max(220, Math.round(rect.width));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(performance.now() + 5000);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      leanTarget = {
        x: ((event.clientY - rect.top) / rect.height - 0.5) * 0.35,
        y: ((event.clientX - rect.left) / rect.width - 0.5) * 0.7,
      };
    };
    const onPointerLeave = () => {
      leanTarget = { x: 0, y: 0 };
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    startedAt = performance.now();
    resize();
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    observer.observe(wrap);

    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
