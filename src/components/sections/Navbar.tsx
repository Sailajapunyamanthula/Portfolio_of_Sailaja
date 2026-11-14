import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, sectionIds } from '../../data/nav';
import { site } from '../../config/site';
import { useActiveSection, useScrollProgress } from '../../hooks/useScroll';
import { cn } from '../../lib/cn';
import { AnchorLink } from '../ui/AnchorLink';
import { Monogram } from '../ui/Monogram';
import { ResumeButton } from '../ui/ResumeButton';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { y, progress } = useScrollProgress();
  const active = useActiveSection(sectionIds);
  const scrolled = y > 16;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-white/[0.06] bg-ink/75 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <AnchorLink
          id="home"
          onNavigate={() => setOpen(false)}
          aria-label={`${site.name}, back to top`}
          className="flex items-center gap-3 rounded-xl"
        >
          <Monogram className="h-9 w-9" />
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-fg sm:block">
            {site.name}
          </span>
        </AnchorLink>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id || (link.id === 'certifications' && active === 'education');
            return (
              <li key={link.id}>
                <AnchorLink
                  id={link.id}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                    isActive ? 'bg-white/[0.07] text-fg' : 'text-fg-sub hover:text-fg',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
                      aria-hidden="true"
                    />
                  )}
                </AnchorLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ResumeButton size="sm" className="hidden md:inline-flex" />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-fg transition-colors hover:border-cyan/50 xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-4rem)] animate-fade-in overflow-y-auto border-t border-white/[0.06] bg-ink/95 backdrop-blur-xl xl:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <AnchorLink
                  id={link.id}
                  onNavigate={() => setOpen(false)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                    active === link.id ? 'bg-white/[0.07] text-fg' : 'text-fg-sub hover:bg-white/[0.04] hover:text-fg',
                  )}
                >
                  {link.label}
                </AnchorLink>
              </li>
            ))}
            <li className="px-1 pb-2 pt-3 md:hidden">
              <ResumeButton className="w-full" />
            </li>
          </ul>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-px" aria-hidden="true">
        <div
          className={cn(
            'h-full origin-left bg-gradient-to-r from-cyan to-violet transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
