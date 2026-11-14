import { navLinks } from '../../data/nav';
import { site } from '../../config/site';
import { AnchorLink } from '../ui/AnchorLink';
import { Monogram } from '../ui/Monogram';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <Monogram className="h-10 w-10" />
              <p className="font-display text-lg font-semibold">{site.name}</p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-sub">
              {site.roles[0]} | {site.roles[1]}
            </p>
            <p className="mt-3 max-w-sm font-mono text-sm text-fg-mute">{`// ${site.closing}`}</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold text-fg">Quick links</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <AnchorLink id={link.id} className="text-sm text-fg-sub transition-colors hover:text-cyan">
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold text-fg">Elsewhere</p>
            <SocialLinks className="mt-4" />
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.07] pt-6 text-sm text-fg-mute">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
