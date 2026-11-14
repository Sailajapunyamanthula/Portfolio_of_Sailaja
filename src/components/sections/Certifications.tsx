import { useId, useState } from 'react';
import { BadgeCheck, ChevronDown, ExternalLink, ImageIcon } from 'lucide-react';
import { certCategories, certifications, type Certification } from '../../data/certifications';
import { cn } from '../../lib/cn';
import { LinkButton } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

function Detail({ label, value, placeholder }: { label: string; value: string | null; placeholder: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/[0.06] py-2.5 text-sm last:border-b-0">
      <dt className="text-fg-mute">{label}</dt>
      <dd className={cn(value ? 'text-fg' : 'ph rounded-lg px-2.5 py-0.5 text-xs')}>{value ?? placeholder}</dd>
    </div>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <GlassCard className="self-start">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 rounded-2xl p-5 text-left"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/25 text-cyan">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-fg">{cert.title}</span>
          <span className="mt-1 block text-xs text-fg-mute">{cert.category}</span>
        </span>
        <ChevronDown
          className={cn('mt-1 h-5 w-5 shrink-0 text-fg-mute transition-transform duration-300', open && 'rotate-180 text-cyan')}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-label={`${cert.title} details`}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          {/* inert keeps collapsed content out of the tab order. React 18 has no typing for it, so it is spread in. */}
          <div className="px-5 pb-5" {...(open ? {} : ({ inert: '' } as Record<string, string>))}>
            {cert.image ? (
              <img
                src={cert.image}
                alt={`${cert.title} certificate`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-xl border border-white/10 object-cover"
              />
            ) : (
              <div className="ph grid aspect-[4/3] w-full place-items-center rounded-xl text-center">
                <div className="px-4">
                  <ImageIcon className="mx-auto h-7 w-7 opacity-70" aria-hidden="true" />
                  <p className="mt-2 text-xs not-italic">Certificate image placeholder</p>
                </div>
              </div>
            )}

            <dl className="mt-4">
              <Detail label="Issuer" value={cert.issuer} placeholder="Add issuer" />
              <Detail label="Issued" value={cert.issued} placeholder="Add date" />
              <Detail label="Credential ID" value={cert.credentialId} placeholder="Add your credential ID" />
            </dl>

            <div className="mt-4">
              {cert.verifyUrl ? (
                <LinkButton
                  href={cert.verifyUrl}
                  variant="secondary"
                  size="sm"
                  rightIcon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                >
                  Verify certificate
                </LinkButton>
              ) : (
                <p className="ph rounded-xl px-4 py-2 text-xs">Verification link: add the URL in src/data/certifications.ts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function Certifications() {
  const [filter, setFilter] = useState<'All' | (typeof certCategories)[number]>('All');
  const visible = certifications.filter((c) => filter === 'All' || c.category === filter);
  const filters = ['All', ...certCategories] as const;

  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Courses and workshops that shaped my foundations. Open a card for details."
    >
      <Reveal>
        <div role="group" aria-label="Filter certifications by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                filter === name
                  ? 'border-transparent bg-gradient-to-r from-cyan to-violet text-[#04121A]'
                  : 'border-white/12 bg-white/[0.04] text-fg-sub hover:border-cyan/40 hover:text-fg',
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </Reveal>

      <p className="sr-only" role="status">
        Showing {visible.length} {visible.length === 1 ? 'certification' : 'certifications'}
      </p>

      <ul className="mt-8 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((cert) => (
          <li key={cert.id} className="flex flex-col">
            <CertCard cert={cert} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
