import { useEffect, useState } from 'react';

export interface ScrollState {
  y: number;
  progress: number;
}

/** Scroll position and 0-1 page progress, updated at most once per animation frame. */
export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({ y: 0, progress: 0 });

  useEffect(() => {
    let raf = 0;
    const calculate = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ y, progress: max > 0 ? Math.min(1, y / max) : 0 });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calculate);
    };
    calculate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}

/** Returns the id of the section that currently sits in the upper part of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  return active;
}
