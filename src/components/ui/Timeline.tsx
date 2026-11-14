import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

/** Vertical timeline rail with a glowing node for each entry. */
export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="relative space-y-8 before:absolute before:bottom-6 before:left-[15px] before:top-6 before:w-px before:bg-gradient-to-b before:from-cyan/60 before:via-violet/40 before:to-transparent sm:space-y-10">
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
  muted?: boolean;
}

export function TimelineItem({ icon, children, delay = 0, muted = false }: TimelineItemProps) {
  return (
    <li className="relative pl-12 sm:pl-16">
      <span
        className={cn(
          'absolute left-0 top-6 grid h-8 w-8 place-items-center rounded-full border bg-ink-800',
          muted ? 'border-white/20 text-fg-mute' : 'border-cyan/45 text-cyan shadow-glow',
        )}
      >
        {icon}
      </span>
      <Reveal delay={delay}>{children}</Reveal>
    </li>
  );
}

/** Shows a date range, or a clearly marked placeholder when it hasn't been filled in yet. */
export function PeriodChip({ value, placeholder }: { value: string | null; placeholder: string }) {
  return value ? (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-fg-sub">
      {value}
    </span>
  ) : (
    <span className="ph inline-flex items-center rounded-full px-3 py-1 text-xs">{placeholder}</span>
  );
}
