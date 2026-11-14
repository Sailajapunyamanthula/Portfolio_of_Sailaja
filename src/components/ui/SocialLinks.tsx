import type { ComponentType, SVGProps } from 'react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { hasValue, site } from '../../config/site';
import { showToast } from '../../lib/toast';
import { cn } from '../../lib/cn';

interface SocialLinksProps {
  className?: string;
  size?: 'md' | 'lg';
}

interface SocialItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  configKey: string;
}

export function SocialLinks({ className, size = 'md' }: SocialLinksProps) {
  const items: SocialItem[] = [
    { label: 'GitHub', href: site.contact.github, icon: GithubIcon, configKey: 'contact.github' },
    { label: 'LinkedIn', href: site.contact.linkedin, icon: LinkedinIcon, configKey: 'contact.linkedin' },
  ];

  const box = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  const glyph = size === 'lg' ? 'h-5 w-5' : 'h-[18px] w-[18px]';
  const shared =
    'grid place-items-center rounded-full border border-white/12 bg-white/[0.04] text-fg-sub transition-all duration-300';

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {items.map(({ label, href, icon: Icon, configKey }) => (
        <li key={label}>
          {hasValue(href) ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className={cn(shared, box, 'hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan')}
            >
              <Icon className={glyph} />
            </a>
          ) : (
            <button
              type="button"
              aria-label={`${label}: link not added yet`}
              onClick={() => showToast(`${label} link not added yet. Set ${configKey} in src/config/site.ts.`)}
              className={cn(shared, box, 'border-dashed opacity-60 hover:opacity-100')}
            >
              <Icon className={glyph} />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
