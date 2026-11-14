import { skillGroups } from '../../data/skills';
import { cn } from '../../lib/cn';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const accentBox = {
  cyan: 'from-cyan/25 to-cyan/5 text-cyan',
  violet: 'from-violet/30 to-violet/5 text-violet-300',
  emerald: 'from-emerald-400/25 to-emerald-400/5 text-emerald-300',
} as const;

const accentChip = {
  cyan: 'hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan',
  violet: 'hover:border-violet/60 hover:bg-violet/10 hover:text-violet-300',
  emerald: 'hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300',
} as const;

export function Skills() {
  return (
    <Section id="skills" title="Technical skills" subtitle="The languages and tools I work with, and the areas I'm growing into.">
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={(i % 2) * 90} className="h-full">
            <GlassCard className="group h-full p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br transition-transform duration-500 group-hover:scale-105',
                    accentBox[group.accent],
                  )}
                >
                  <group.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <p className="text-sm text-fg-mute">{group.blurb}</p>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <span
                      className={cn(
                        'inline-flex cursor-default items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-fg transition-all duration-300 hover:-translate-y-0.5',
                        accentChip[group.accent],
                      )}
                    >
                      <skill.icon className="h-4 w-4" aria-hidden="true" />
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
