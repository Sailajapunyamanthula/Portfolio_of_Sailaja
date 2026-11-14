import { useCallback, useState } from 'react';
import { projects, type Project } from '../../data/projects';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectModal } from './projects/ProjectModal';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Ideas I've taken from a problem to something you can open and try. Select a card for the full story."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 100} className="h-full">
            <ProjectCard project={project} onOpen={setSelected} />
          </Reveal>
        ))}
      </div>
      <ProjectModal project={selected} onClose={close} />
    </Section>
  );
}
