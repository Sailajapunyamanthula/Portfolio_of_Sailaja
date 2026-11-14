import { achievements } from '../../data/achievements';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements" subtitle="Milestones from hackathons, buildathons and daily practice.">
      <div className="grid gap-5 md:grid-cols-2">
        {achievements.map((item, i) => (
          <Reveal key={item.id} delay={(i % 2) * 90} className="h-full">
            <GlassCard className="group relative h-full overflow-hidden p-6 sm:p-8">
              <item.icon
                className="pointer-events-none absolute -bottom-5 -right-4 h-32 w-32 text-white/[0.035] transition-all duration-700 group-hover:-rotate-6 group-hover:text-cyan/[0.09]"
                aria-hidden="true"
              />
              <div className="relative flex items-start gap-5">
                <div className="w-[4.75rem] shrink-0 sm:w-[5.5rem]">
                  <p className="text-gradient font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">{item.stat}</p>
                  <p className="mt-2 text-xs font-medium text-fg-mute">{item.statLabel}</p>
                </div>
                <div className="min-w-0 flex-1 border-l border-white/10 pl-5">
                  <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-sub">{item.detail}</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
