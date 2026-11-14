import { ExternalLink, Maximize2 } from 'lucide-react';
import type { Project } from '../../../data/projects';
import { GlassCard } from '../../ui/GlassCard';
import { GithubIcon } from '../../ui/Icons';
import { LinkButton, Button } from '../../ui/Button';
import { Tag } from '../../ui/Tag';
import { ProjectArt } from '../../visual/ProjectArt';
import { accentTone } from './accent';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <GlassCard className="group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1.5">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
        className="relative block aspect-[16/9] w-full overflow-hidden rounded-t-3xl text-left"
      >
        <ProjectArt
          variant={project.art}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink-800/80 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute left-4 top-4">
          <Tag tone={accentTone[project.accent]} className="backdrop-blur">
            {project.type}
          </Tag>
        </span>
        <span
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink/60 text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-sub">{project.description}</p>

        <dl className="mt-5 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-semibold text-fg">Problem</dt>
            <dd className="text-fg-sub">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold text-fg">Solution</dt>
            <dd className="text-fg-sub">{project.solution}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} focus areas`}>
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
          {project.demo && (
            <LinkButton
              href={project.demo}
              size="sm"
              aria-label={`${project.title} live demo (opens in a new tab)`}
              rightIcon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              Live demo
            </LinkButton>
          )}
          {project.github && (
            <LinkButton
              href={project.github}
              variant="secondary"
              size="sm"
              aria-label={`${project.title} on GitHub (opens in a new tab)`}
              leftIcon={<GithubIcon className="h-4 w-4" />}
            >
              GitHub
            </LinkButton>
          )}
          <Button variant="ghost" size="sm" onClick={() => onOpen(project)} className="ml-auto">
            View details
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
