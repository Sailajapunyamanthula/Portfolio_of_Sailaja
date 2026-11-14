import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScroll';
import { scrollToTop } from '../../lib/scroll';
import { cn } from '../../lib/cn';

export function BackToTop() {
  const { y } = useScrollProgress();
  const visible = y > 700;

  return (
    <button
      type="button"
      onClick={() => {
        scrollToTop();
        document.getElementById('home')?.focus({ preventScroll: true });
      }}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'glass fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full text-cyan transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-glow sm:bottom-8 sm:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
