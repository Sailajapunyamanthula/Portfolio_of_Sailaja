const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth-scrolls to a section, updates the URL hash and moves focus for keyboard users. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  try {
    history.replaceState(null, '', `#${id}`);
  } catch {
    /* some embedded frames block history updates; scrolling still works */
  }
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  try {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  } catch {
    /* see scrollToId */
  }
}
