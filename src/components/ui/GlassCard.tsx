import type { HTMLAttributes, PointerEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Disable the cursor-follow glow for static surfaces. */
  spotlight?: boolean;
}

/** Frosted-glass surface with a glow that follows the cursor. */
export function GlassCard({ children, className, spotlight = true, onPointerMove, ...rest }: GlassCardProps) {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };

  return (
    <div
      {...rest}
      onPointerMove={spotlight ? handleMove : onPointerMove}
      className={cn('glass rounded-2xl', spotlight && 'spot', className)}
    >
      {children}
    </div>
  );
}
