import type { CSSProperties } from 'react';
import { FolderGit2, Mail } from 'lucide-react';
import { site } from '../../config/site';
import { AnchorLink } from '../ui/AnchorLink';
import { buttonClasses } from '../ui/Button';
import { SocialLinks } from '../ui/SocialLinks';
import { NeuralOrb } from '../visual/NeuralOrb';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const chips: Array<{ label: string; className: string; style: CSSProperties }> = [
  { label: 'python', className: 'left-[1%] top-[14%]', style: { animationDelay: '0s' } },
  { label: '</>', className: 'right-[4%] top-[8%] hidden sm:flex', style: { animationDelay: '-2s' } },
  { label: '{ }', className: 'left-[6%] bottom-[18%]', style: { animationDelay: '-4s' } },
  { label: 'SELECT *', className: 'right-[0%] top-[46%] hidden sm:flex', style: { animationDelay: '-1s' } },
  { label: 'automate()', className: 'right-[10%] bottom-[8%]', style: { animationDelay: '-3s' } },
  { label: 'learn()', className: 'left-[30%] top-[0%] hidden md:flex', style: { animationDelay: '-5s' } },
];

export function Hero() {
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center pb-16 pt-28 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div className="relative z-10">
          <p
            className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4 text-sm text-fg-sub backdrop-blur"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {site.status}
          </p>

          <h1
            id="hero-title"
            className="hero-in mt-7 text-[clamp(2.5rem,5.6vw,4.6rem)] font-semibold leading-[1.04] tracking-tight"
            style={delay(120)}
          >
            <span className="text-gradient-hero block">
              {site.name.split(' ').map((word, i) => (
                <span key={word} className="block">
                  {i > 0 && <span className="sr-only"> </span>}
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="hero-in mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-display text-lg font-medium text-fg sm:text-xl"
            style={delay(240)}
          >
            <span>{site.roles[0]}</span>
            <span className="hidden h-5 w-px bg-white/25 sm:block" aria-hidden="true" />
            <span className="sr-only"> | </span>
            <span className="text-cyan">{site.roles[1]}</span>
          </p>

          <p className="hero-in mt-5 max-w-xl text-lg leading-relaxed text-fg-sub" style={delay(340)}>
            {site.tagline}
          </p>
          <p className="hero-in mt-3 max-w-xl text-base leading-relaxed text-fg-mute" style={delay(400)}>
            {site.intro}
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={delay(500)}>
            <AnchorLink id="projects" className={buttonClasses('primary', 'lg')}>
              <FolderGit2 className="h-4 w-4" aria-hidden="true" />
              View my work
            </AnchorLink>
            <AnchorLink id="contact" className={buttonClasses('secondary', 'lg')}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Let's connect
            </AnchorLink>
          </div>

          <div className="hero-in mt-8" style={delay(600)}>
            <SocialLinks />
          </div>
        </div>

        <div className="orb-in relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none" aria-hidden="true">
          <div className="absolute inset-[5%] animate-spin-slow rounded-full border border-dashed border-cyan/15">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-glow" />
          </div>
          <div className="absolute inset-[13%] animate-spin-slower rounded-full border border-violet/20">
            <span className="absolute bottom-[14%] right-[6%] h-1.5 w-1.5 rounded-full bg-violet shadow-glow-violet" />
          </div>
          <NeuralOrb className="absolute inset-0" />
          {chips.map((chip) => (
            <span
              key={chip.label}
              style={chip.style}
              className={`glass absolute animate-float items-center rounded-xl px-3 py-1.5 font-mono text-xs text-cyan/90 ${chip.className} ${chip.className.includes('hidden') ? '' : 'flex'}`}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
