import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={cn('relative py-20 sm:py-28', className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <h2
            id={`${id}-title`}
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            {title}
          </h2>
          <div className="mt-5 h-px w-24 bg-gradient-to-r from-cyan via-violet to-transparent" aria-hidden="true" />
          {subtitle && <p className="mt-5 text-base leading-relaxed text-fg-sub sm:text-lg">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
