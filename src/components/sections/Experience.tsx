import { Briefcase, Check } from 'lucide-react';
import { experience } from '../../data/experience';
import { GlassCard } from '../ui/GlassCard';
import { Section } from '../ui/Section';
import { PeriodChip, Timeline, TimelineItem } from '../ui/Timeline';

export function Experience() {
  return (
    <Section id="experience" title="Professional experience" subtitle="Hands-on roles in business development and data work.">
      <Timeline>
        {experience.map((item, i) => (
          <TimelineItem key={item.id} delay={i * 100} icon={<Briefcase className="h-3.5 w-3.5" aria-hidden="true" />}>
            <GlassCard className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">{item.role}</h3>
                  <p className="mt-1.5 text-base text-cyan">
                    {item.company}
                    {item.companyNote && <span className="text-fg-sub"> ({item.companyNote})</span>}
                  </p>
                </div>
                <PeriodChip value={item.period} placeholder="Add employment dates" />
              </div>

              <ul className="mt-6 space-y-3">
                {item.responsibilities.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-fg-sub">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                    {line}
                  </li>
                ))}
                {item.allowMorePlaceholder && (
                  <li className="ph rounded-xl px-4 py-2.5 text-sm">
                    Add more responsibilities here (src/data/experience.ts)
                  </li>
                )}
              </ul>
            </GlassCard>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
