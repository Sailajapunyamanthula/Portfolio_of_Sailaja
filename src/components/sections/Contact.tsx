import type { ComponentType, SVGProps } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { hasValue, site } from '../../config/site';
import { cn } from '../../lib/cn';
import { GlassCard } from '../ui/GlassCard';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SocialLinks } from '../ui/SocialLinks';
import { ContactForm } from './contact/ContactForm';

interface Row {
  label: string;
  value: string;
  href?: string;
  display?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>> | typeof Mail;
  placeholder: string;
  external?: boolean;
}

const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function Contact() {
  const c = site.contact;
  const rows: Row[] = [
    {
      label: 'Email',
      value: c.email,
      href: `mailto:${c.email}`,
      icon: Mail,
      placeholder: 'Add your email in src/config/site.ts',
    },
    {
      label: 'Phone',
      value: c.phone,
      href: `tel:${c.phone.replace(/[^\d+]/g, '')}`,
      icon: Phone,
      placeholder: 'Add your phone number in src/config/site.ts',
    },
    { label: 'Location', value: c.location, icon: MapPin, placeholder: 'Add your location in src/config/site.ts' },
    {
      label: 'LinkedIn',
      value: c.linkedin,
      href: c.linkedin,
      display: prettyUrl(c.linkedin),
      icon: LinkedinIcon,
      placeholder: 'Add your LinkedIn URL in src/config/site.ts',
      external: true,
    },
    {
      label: 'GitHub',
      value: c.github,
      href: c.github,
      display: prettyUrl(c.github),
      icon: GithubIcon,
      placeholder: 'Add your GitHub URL in src/config/site.ts',
      external: true,
    },
  ];

  return (
    <Section
      id="contact"
      title="Let's Build Something Great Together."
      subtitle="Have an opportunity, a project idea or a question? Send a message and I'll reply."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <Reveal className="h-full min-w-0">
          <GlassCard className="flex h-full flex-col p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Contact details</h3>
            <ul className="mt-6 space-y-4">
              {rows.map((row) => {
                const filled = hasValue(row.value);
                return (
                  <li key={row.label} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/25 text-cyan">
                      <row.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm text-fg-mute">{row.label}</p>
                      {filled ? (
                        row.href ? (
                          <a
                            href={row.href}
                            {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="break-words text-[15px] font-medium text-fg underline-offset-4 transition-colors hover:text-cyan hover:underline"
                          >
                            {row.display ?? row.value}
                          </a>
                        ) : (
                          <p className="break-words text-[15px] font-medium text-fg">{row.value}</p>
                        )
                      ) : (
                        <p className={cn('ph mt-1 inline-block rounded-lg px-3 py-1 text-xs')}>{row.placeholder}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-white/[0.07] pt-6">
              <p className="text-sm text-fg-sub">Find me online</p>
              <SocialLinks className="mt-3" size="lg" />
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={100} className="min-w-0">
          <GlassCard className="p-6 sm:p-8" spotlight={false}>
            <h3 className="text-xl font-semibold">Send a message</h3>
            <p className="mb-6 mt-2 text-sm text-fg-sub">All fields are required.</p>
            <ContactForm />
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
