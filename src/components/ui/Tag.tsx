import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type TagTone = 'neutral' | 'cyan' | 'violet' | 'emerald';

const tones: Record<TagTone, string> = {
  neutral: 'border-white/10 bg-white/[0.04] text-fg-sub',
  cyan: 'border-cyan/25 bg-cyan/10 text-cyan',
  violet: 'border-violet/30 bg-violet/10 text-violet-300',
  emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
};

interface TagProps {
  children: ReactNode;
  tone?: TagTone;
  icon?: ReactNode;
  className?: string;
}

export function Tag({ children, tone = 'neutral', icon, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
