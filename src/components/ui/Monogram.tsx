import { useId } from 'react';
import { site } from '../../config/site';

export function Monogram({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`mg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00E5FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0A0F1A" />
      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill="none" stroke={`url(#mg${id})`} strokeWidth="3" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Sora, Arial, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill={`url(#mg${id})`}
      >
        {site.monogram}
      </text>
    </svg>
  );
}
