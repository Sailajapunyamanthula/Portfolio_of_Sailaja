import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../../../data/projects';
import { Button, LinkButton } from '../../ui/Button';
import { GithubIcon } from '../../ui/Icons';
import { Modal } from '../../ui/Modal';
import { Tag } from '../../ui/Tag';
import { ProjectArt } from '../../visual/ProjectArt';
import { accentText, accentTone } from './accent';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;
  const titleId = `project-${project.id}-title`;

  return (
    <Modal open onClose={onClose} labelledBy={titleId}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project details"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-ink/70 text-fg backdrop-blur transition-colors hover:border-cyan/50"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <ProjectArt variant={project.art} running className="aspect-[2/1] w-full" />

      <div className="p-6 sm:p-9">
        <Tag tone={accentTone[project.accent]}>{project.type}</Tag>
        <h3 id={titleId} className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-fg-sub">{project.description}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <section aria-labelledby={`${titleId}-problem`}>
            <h4 id={`${titleId}-problem`} className={`text-sm font-semibold ${accentText[project.accent]}`}>
              Problem
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-sub">{project.problem}</p>
          </section>
          <section aria-labelledby={`${titleId}-solution`}>
            <h4 id={`${titleId}-solution`} className={`text-sm font-semibold ${accentText[project.accent]}`}>
              Solution
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-sub">{project.solution}</p>
          </section>
        </div>

        <section className="mt-8" aria-labelledby={`${titleId}-highlights`}>
          <h4 id={`${titleId}-highlights`} className="text-sm font-semibold text-fg">
            Highlights
          </h4>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-fg-sub">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan to-violet" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        {project.workflows && (
          <section className="mt-8" aria-labelledby={`${titleId}-workflows`}>
            <h4 id={`${titleId}-workflows`} className="text-sm font-semibold text-fg">
              Workflows
            </h4>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {project.workflows.map((flow) => (
                <li key={flow.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-fg">{flow.title}</p>
                  {flow.detail ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-sub">{flow.detail}</p>
                  ) : (
                    <p className="ph mt-2 rounded-lg px-3 py-1.5 text-xs">Add details (src/data/projects.ts)</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8" aria-labelledby={`${titleId}-tech`}>
          <h4 id={`${titleId}-tech`} className="text-sm font-semibold text-fg">
            Technologies
          </h4>
          {project.techStack.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech}>
                  <Tag tone="neutral">{tech}</Tag>
                </li>
              ))}
            </ul>
          ) : (
            <p className="ph mt-3 inline-block rounded-xl px-4 py-2 text-sm">
              Add the technologies used (src/data/projects.ts)
            </p>
          )}
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Focus areas">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag tone={accentTone[project.accent]}>{tag}</Tag>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {project.demo && (
            <LinkButton
              href={project.demo}
              rightIcon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
              aria-label={`${project.title} live demo (opens in a new tab)`}
            >
              Live demo
            </LinkButton>
          )}
          {project.github && (
            <LinkButton
              href={project.github}
              variant="secondary"
              leftIcon={<GithubIcon className="h-4 w-4" />}
              aria-label={`${project.title} on GitHub (opens in a new tab)`}
            >
              GitHub
            </LinkButton>
          )}
          {!project.demo && !project.github && (
            <p className="ph rounded-xl px-4 py-2 text-sm">GitHub and live demo links: add them in src/data/projects.ts</p>
          )}
          <Button variant="ghost" onClick={onClose} className="ml-auto">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
