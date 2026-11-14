import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan to-violet text-[#04121A] shadow-glow hover:-translate-y-0.5 hover:shadow-[0_0_34px_-2px_rgba(0,229,255,.55)]',
  secondary:
    'border border-white/15 bg-white/[0.04] text-fg hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white/[0.08]',
  ghost: 'text-fg-sub hover:text-fg',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cn(base, variants[variant], sizes[size], className);

interface CommonProps {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant,
  size,
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

/** External link styled as a button. Opens in a new tab safely. */
export function LinkButton({
  variant,
  size,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
}
