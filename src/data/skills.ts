import {
  Bot,
  Braces,
  BrainCircuit,
  ChartColumn,
  CodeXml,
  Database,
  Globe,
  LayoutGrid,
  Palette,
  Sparkles,
  Terminal,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { Accent } from '../types';

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  accent: Accent;
  skills: Skill[];
}

/**
 * Only confirmed technologies are listed, and no proficiency levels are shown.
 * Add or remove entries here.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    blurb: 'Core languages',
    icon: Terminal,
    accent: 'cyan',
    skills: [
      { name: 'Python', icon: Terminal },
      { name: 'JavaScript', icon: Braces },
    ],
  },
  {
    id: 'web',
    title: 'Web development',
    blurb: 'Front-end foundations',
    icon: Globe,
    accent: 'violet',
    skills: [
      { name: 'HTML', icon: CodeXml },
      { name: 'CSS', icon: Palette },
      { name: 'Bootstrap', icon: LayoutGrid },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    blurb: 'Working with data',
    icon: Database,
    accent: 'cyan',
    skills: [{ name: 'SQL', icon: Database }],
  },
  {
    id: 'interests',
    title: 'Additional interests',
    blurb: 'Areas I keep exploring',
    icon: Sparkles,
    accent: 'violet',
    skills: [
      { name: 'Artificial Intelligence', icon: Bot },
      { name: 'Machine Learning', icon: BrainCircuit },
      { name: 'Data Analytics', icon: ChartColumn },
      { name: 'Generative AI', icon: WandSparkles },
      { name: 'Automation', icon: Workflow },
    ],
  },
];
