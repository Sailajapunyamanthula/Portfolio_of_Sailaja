import { GraduationCap, Plus } from 'lucide-react';
import { education } from '../../data/education';
import { GlassCard } from '../ui/GlassCard';
import { Section } from '../ui/Section';
import { Tag } from '../ui/Tag';
import { PeriodChip, Timeline, TimelineItem } from '../ui/Timeline';

export function Education() {
  return (
    <Section id="education" title="Education" subtitle="Where my engineering foundation comes from.">
      <Timeline>
        {education.map((item, i) => (
          <TimelineItem
            key={item.id}
            delay={i * 100}
            muted={item.placeholder}
            icon={
              item.placeholder ? (
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              )
            }
          >
            {item.placeholder ? (
              <div className="ph rounded-2xl p-6">
                <p className="text-base not-italic text-fg-sub">{item.degree}</p>
                <p className="mt-1 text-sm">{item.institution}</p>
              </div>
            ) : (
              <GlassCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">{item.degree}</h3>
                    <p className="mt-1.5 text-base text-cyan">
                      {item.institution}
                      {item.affiliation && <span className="text-fg-sub">, {item.affiliation}</span>}
                    </p>
                  </div>
                  <PeriodChip value={item.period} placeholder="Add start year to graduation year" />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {item.cgpa && <Tag tone="cyan">CGPA {item.cgpa}</Tag>}
                  {item.graduationYear ? (
                    <Tag>Graduation {item.graduationYear}</Tag>
                  ) : (
                    <span className="ph rounded-full px-3 py-1 text-xs">Add graduation year</span>
                  )}
                </div>
              </GlassCard>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
