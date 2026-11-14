import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { scrollToId } from '../../lib/scroll';

interface AnchorLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  id: string;
  children: ReactNode;
  onNavigate?: () => void;
}

/** In-page link that smooth-scrolls. Keeps a real href so it still works in a new tab. */
export function AnchorLink({ id, children, onNavigate, ...rest }: AnchorLinkProps) {
  return (
    <a
      href={`#${id}`}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        onNavigate?.();
        scrollToId(id);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
