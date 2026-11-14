import { BookOpen, Cpu, GraduationCap } from 'lucide-react';
import { hasValue, site } from '../../config/site';
import { AnchorLink } from '../ui/AnchorLink';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

function PhotoPlaceholder() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end bg-gradient-to-b from-ink-700 via-ink-800 to-ink-900">
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="ph-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00E5FF" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="92" r="38" fill="url(#ph-g)" opacity=".16" />
        <path d="M30 250 C 30 188, 66 160, 100 160 C 134 160, 170 188, 170 250Z" fill="url(#ph-g)" opacity=".16" />
        <circle cx="100" cy="92" r="38" fill="none" stroke="url(#ph-g)" strokeOpacity=".55" strokeDasharray="3 6" />
      </svg>
      <p className="relative mb-6 max-w-[16rem] px-4 text-center text-sm leading-relaxed text-fg-mute">
        Photo placeholder. Set <code className="font-mono text-xs text-fg-sub">profileImage</code> in{' '}
        <code className="font-mono text-xs text-fg-sub">src/config/site.ts</code> to show your picture.
      </p>
    </div>
  );
}

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    body: 'B.Tech in Computer Science and Engineering (AI & ML) at UCEK, JNTUK. CGPA 8.8.',
    link: { id: 'education', label: 'See education details' },
  },
  {
    icon: Cpu,
    title: 'Technical interests',
    body: 'Artificial Intelligence, Machine Learning, Data Analytics, Generative AI and Automation.',
  },
  {
    icon: BookOpen,
    title: 'Continuous learning',
    body: 'Hackathons, certifications and a 190-day coding streak.',
    link: { id: 'achievements', label: 'See achievements' },
  },
];

export function About() {
  return (
    <Section
      id="about"
      title="A student who learns by building"
      subtitle="Software, data and automation, with a focus on useful things."
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-cyan/25 via-transparent to-violet/30 opacity-70 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-800 p-1.5">
              <div className="h-full w-full overflow-hidden rounded-[1.4rem]">
                {hasValue(site.profileImage) ? (
                  <img
                    src={site.profileImage}
                    alt={`Portrait of ${site.name}`}
                    width={720}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PhotoPlaceholder />
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-fg">
              I'm a Computer Science and Engineering student specializing in Artificial Intelligence and Machine
              Learning, with a growing interest in software development, data analytics and automation.
            </p>
            <p className="mt-5 text-base leading-relaxed text-fg-sub sm:text-lg">
              I like solving practical problems and turning ideas into useful applications. I keep learning emerging
              technologies, from generative AI to workflow automation, by building with them.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="h-full">
                <GlassCard className="flex h-full flex-col p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-sub">{item.body}</p>
                  {item.link && (
                    <AnchorLink
                      id={item.link.id}
                      className="mt-auto pt-4 text-sm font-medium text-cyan underline-offset-4 hover:underline"
                    >
                      {item.link.label}
                    </AnchorLink>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
