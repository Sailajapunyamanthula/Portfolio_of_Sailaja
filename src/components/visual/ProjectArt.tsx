import { useId } from 'react';
import type { ArtVariant } from '../../data/projects';

interface ProjectArtProps {
  variant: ArtVariant;
  className?: string;
  /** Keeps the flowing dashes moving (used in the detail view). */
  running?: boolean;
}

const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

const starPath = (cx: number, cy: number, outer: number, inner: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join(' L')}Z`;
};

/** Original abstract illustrations, one per project, drawn as inline SVG. */
export function ProjectArt({ variant, className, running = false }: ProjectArtProps) {
  const uid = useId().replace(/:/g, '');
  const flow = running ? 'flow-dash running' : 'flow-dash';

  const defs = (
    <defs>
      <radialGradient id={`bg${uid}`} cx="50%" cy="45%" r="75%">
        <stop offset="0" stopColor="#16203A" />
        <stop offset="1" stopColor="#090E1A" />
      </radialGradient>
      <linearGradient id={`ac${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#00E5FF" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id={`em${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#34D399" />
        <stop offset="1" stopColor="#00E5FF" />
      </linearGradient>
      <linearGradient id={`vi${uid}`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#00E5FF" />
      </linearGradient>
      <radialGradient id={`gl${uid}`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#8B5CF6" stopOpacity=".5" />
        <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`hill${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#34D399" stopOpacity=".28" />
        <stop offset="1" stopColor="#34D399" stopOpacity="0" />
      </linearGradient>
      <pattern id={`grid${uid}`} width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="#94A3B8" strokeOpacity=".07" />
      </pattern>
    </defs>
  );

  const backdrop = (
    <>
      <rect width="640" height="360" fill={`url(#bg${uid})`} />
      <rect width="640" height="360" fill={`url(#grid${uid})`} />
    </>
  );

  const noteBars = (x: number, y: number, w: number) => (
    <>
      <rect x={x + 14} y={y + 16} width={w * 0.58} height="6" rx="3" fill="#8793AB" opacity=".55" />
      <rect x={x + 14} y={y + 32} width={w * 0.76} height="6" rx="3" fill="#8793AB" opacity=".4" />
      <rect x={x + 14} y={y + 48} width={w * 0.42} height="6" rx="3" fill="#8793AB" opacity=".4" />
    </>
  );

  let scene;

  if (variant === 'solosense') {
    const notes = [
      { x: 46, y: 56, w: 118, h: 78, r: -9 },
      { x: 92, y: 152, w: 128, h: 82, r: 6 },
      { x: 38, y: 246, w: 116, h: 68, r: -4 },
    ];
    scene = (
      <>
        {notes.map((n) => (
          <g key={n.x} transform={`rotate(${n.r} ${n.x + n.w / 2} ${n.y + n.h / 2})`}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" fill="#111A2E" stroke="#8793AB" strokeOpacity=".28" />
            {noteBars(n.x, n.y, n.w)}
          </g>
        ))}
        <g fill="none" stroke={`url(#ac${uid})`} strokeWidth="2" className={flow}>
          <path d="M164 98 C 220 98, 232 170, 282 177" />
          <path d="M222 194 C 250 190, 262 185, 282 183" />
          <path d="M148 276 C 210 276, 240 202, 284 189" />
        </g>
        <circle cx="310" cy="182" r="64" fill={`url(#gl${uid})`} />
        <circle cx="310" cy="182" r="30" fill="#0E1526" stroke={`url(#ac${uid})`} strokeWidth="2" />
        <path d="M310 164 L315 177 L328 182 L315 187 L310 200 L305 187 L292 182 L305 177Z" fill={`url(#ac${uid})`} />
        <g fill="none" stroke={`url(#ac${uid})`} strokeWidth="2" className={flow}>
          <path d="M340 182 C 376 182, 376 90, 410 90" />
          <path d="M340 182 L410 180" />
          <path d="M340 182 C 376 182, 376 270, 410 270" />
        </g>
        {[64, 154, 244].map((y, i) => (
          <g key={y}>
            <rect x="412" y={y} width="190" height="52" rx="13" fill="#101830" stroke={`url(#ac${uid})`} strokeOpacity=".7" />
            <circle cx="440" cy={y + 26} r="13" fill={`url(#ac${uid})`} />
            <text
              x="440"
              y={y + 26}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Sora, Arial, sans-serif"
              fontWeight="700"
              fontSize="14"
              fill="#04121A"
            >
              {i + 1}
            </text>
            <rect x="466" y={y + 15} width="104" height="6" rx="3" fill="#E7ECF5" opacity=".75" />
            <rect x="466" y={y + 30} width={[78, 92, 62][i]} height="6" rx="3" fill="#8793AB" opacity=".55" />
          </g>
        ))}
      </>
    );
  } else if (variant === 'verdantgrid') {
    const nodes: Array<[number, number]> = [
      [96, 170],
      [188, 108],
      [286, 176],
      [372, 102],
      [212, 226],
      [330, 238],
    ];
    const edges: Array<[number, number]> = [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
      [4, 2],
      [2, 5],
      [4, 5],
    ];
    scene = (
      <>
        <path d="M0 270 C 120 226, 220 252, 330 232 S 540 212, 640 244 L640 360 L0 360Z" fill={`url(#hill${uid})`} />
        <path d="M0 304 C 140 272, 260 300, 380 282 S 560 270, 640 292 L640 360 L0 360Z" fill="#0B1424" opacity=".85" />
        {Array.from({ length: 46 }, (_, i) => {
          const x = 14 + i * 13.6;
          const h = 26 + ((i * 37) % 30);
          const lean = ((i * 53) % 21) - 10;
          return (
            <path
              key={i}
              d={`M${x} 336 Q${x + lean * 0.4} ${336 - h * 0.55} ${x + lean} ${336 - h}`}
              fill="none"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.35 + ((i * 17) % 40) / 100}
            />
          );
        })}
        <g stroke={`url(#em${uid})`} strokeWidth="1.6" opacity=".8">
          {edges.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        {nodes.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="12" fill="#34D399" opacity=".14" />
            <circle cx={x} cy={y} r="5.5" fill={`url(#em${uid})`} />
          </g>
        ))}
        <g fill="none" stroke={`url(#em${uid})`} strokeWidth="2" className={flow}>
          <path d="M372 102 C 430 100, 440 170, 480 192" />
          <path d="M330 238 C 400 250, 440 242, 480 238" />
        </g>
        <rect x="478" y="152" width="86" height="134" rx="43" fill="#0F1A2C" stroke={`url(#em${uid})`} strokeWidth="2" />
        <g stroke="#34D399" strokeOpacity=".35">
          <line x1="486" y1="196" x2="556" y2="196" />
          <line x1="482" y1="220" x2="560" y2="220" />
          <line x1="486" y1="244" x2="556" y2="244" />
        </g>
        <path
          d="M521 92 C 541 114, 549 130, 537 144 C 531 150, 511 150, 505 142 C 497 130, 509 116, 521 92Z"
          fill={`url(#em${uid})`}
        />
        <path d="M521 120 C 529 130, 531 136, 526 141 C 522 144, 517 143, 515 139 C 513 134, 517 128, 521 120Z" fill="#0A0F1A" opacity=".55" />
      </>
    );
  } else if (variant === 'finfluence') {
    const heights = [60, 92, 84, 128, 170];
    const points: Array<[number, number]> = heights.map((h, i) => [88 + i * 58, 292 - h - 22]);
    scene = (
      <>
        {heights.map((h, i) => (
          <rect
            key={i}
            x={70 + i * 58}
            y={292 - h}
            width="36"
            height={h}
            rx="9"
            fill={`url(#vi${uid})`}
            opacity={0.5 + i * 0.1}
          />
        ))}
        <line x1="52" y1="292" x2="372" y2="292" stroke="#8793AB" strokeOpacity=".35" />
        <path
          d={`M${points.map(([x, y]) => `${x} ${y}`).join(' L')}`}
          fill="none"
          stroke="#E7ECF5"
          strokeOpacity=".85"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="5" fill="#0A0F1A" stroke="#00E5FF" strokeWidth="2.5" />
        ))}
        <path
          d="M420 118 C 440 140, 448 156, 436 170 C 430 176, 410 176, 404 168 C 396 156, 408 142, 420 118Z"
          fill={`url(#ac${uid})`}
        />
        <path d="M420 146 C 428 156, 430 162, 425 167 C 421 170, 416 169, 414 165 C 412 160, 416 154, 420 146Z" fill="#0A0F1A" opacity=".5" />
        {Array.from({ length: 7 }, (_, i) => (
          <circle
            key={i}
            cx={392 + i * 14}
            cy="206"
            r="5"
            fill={i < 5 ? `url(#ac${uid})` : 'none'}
            stroke={`url(#ac${uid})`}
            strokeWidth="1.5"
          />
        ))}
        <polygon points={hexPoints(530, 112, 48)} fill="#101830" stroke={`url(#ac${uid})`} strokeWidth="2.5" />
        <polygon points={hexPoints(530, 112, 36)} fill="none" stroke="#8B5CF6" strokeOpacity=".4" />
        <path d={starPath(530, 112, 20, 8.5)} fill={`url(#ac${uid})`} />
        <polygon points={hexPoints(582, 238, 28)} fill="#101830" stroke="#8B5CF6" strokeOpacity=".8" strokeWidth="2" />
        <polygon points={hexPoints(474, 252, 24)} fill="#101830" stroke="#00E5FF" strokeOpacity=".7" strokeWidth="2" />
        <rect x="392" y="300" width="198" height="10" rx="5" fill="#1A2440" />
        <rect x="392" y="300" width="126" height="10" rx="5" fill={`url(#ac${uid})`} />
      </>
    );
  } else {
    scene = (
      <>
        <g fill="none" stroke={`url(#ac${uid})`} strokeWidth="2" className={flow}>
          <path d="M120 127 C 190 127, 210 172, 246 178" />
          <path d="M120 255 C 190 255, 210 190, 246 184" />
          <path d="M334 176 C 400 176, 410 87, 470 87" />
          <path d="M334 180 L470 180" />
          <path d="M334 184 C 400 184, 410 273, 470 273" />
        </g>
        <rect x="50" y="92" width="70" height="70" rx="16" fill="#101830" stroke={`url(#ac${uid})`} strokeOpacity=".8" strokeWidth="1.5" />
        <text x="85" y="127" textAnchor="middle" dominantBaseline="central" fontFamily="JetBrains Mono, monospace" fontWeight="500" fontSize="22" fill="#00E5FF">
          {'{ }'}
        </text>
        <rect x="50" y="220" width="70" height="70" rx="16" fill="#101830" stroke={`url(#ac${uid})`} strokeOpacity=".8" strokeWidth="1.5" />
        {[
          [68, 238],
          [88, 238],
          [68, 258],
          [88, 258],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="14" height="14" rx="4" fill={`url(#ac${uid})`} opacity=".85" />
        ))}
        <circle cx="290" cy="180" r="74" fill={`url(#gl${uid})`} />
        <circle cx="290" cy="180" r="44" fill="#0E1526" stroke={`url(#ac${uid})`} strokeWidth="2.5" />
        <circle cx="290" cy="180" r="56" fill="none" stroke="#8B5CF6" strokeOpacity=".3" strokeDasharray="3 7" />
        <path d="M290 154 L297 173 L316 180 L297 187 L290 206 L283 187 L264 180 L283 173Z" fill={`url(#ac${uid})`} />
        {[56, 149, 242].map((y) => (
          <rect key={y} x="470" y={y} width="112" height="62" rx="14" fill="#101830" stroke={`url(#ac${uid})`} strokeOpacity=".7" strokeWidth="1.5" />
        ))}
        <g stroke="#E7ECF5" strokeWidth="3" strokeLinecap="round" opacity=".85">
          <line x1="492" y1="75" x2="560" y2="75" />
          <line x1="492" y1="87" x2="548" y2="87" opacity=".7" />
          <line x1="492" y1="99" x2="530" y2="99" opacity=".5" />
        </g>
        <g fill="none" stroke="#E7ECF5" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" opacity=".85">
          <rect x="494" y="163" width="34" height="36" rx="5" />
          <circle cx="511" cy="175" r="5" />
          <path d="M502 192 C 504 185, 518 185, 520 192" />
          <line x1="540" y1="171" x2="562" y2="171" />
          <line x1="540" y1="183" x2="556" y2="183" opacity=".7" />
        </g>
        <g fill="none" stroke="#E7ECF5" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" opacity=".85">
          <rect x="494" y="257" width="64" height="34" rx="6" />
          <path d="M496 261 L526 280 L556 261" />
        </g>
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {defs}
      {backdrop}
      {scene}
    </svg>
  );
}
