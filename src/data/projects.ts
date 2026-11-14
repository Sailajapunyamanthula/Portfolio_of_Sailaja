import type { Accent } from '../types';

export type ArtVariant = 'solosense' | 'verdantgrid' | 'finfluence' | 'automation';

export interface Workflow {
  title: string;
  /** Add a one-line description once you confirm the implementation. */
  detail: string | null;
}

export interface Project {
  id: string;
  title: string;
  type: 'Concept' | 'Collection';
  accent: Accent;
  art: ArtVariant;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  /** Focus areas shown as tags on the card. */
  tags: string[];
  /** Real technologies used. Left empty until confirmed; the modal shows a placeholder. */
  techStack: string[];
  github?: string;
  demo?: string;
  workflows?: Workflow[];
}

export const projects: Project[] = [
  {
    id: 'solosense',
    title: 'SoloSense AI',
    type: 'Concept',
    accent: 'cyan',
    art: 'solosense',
    description:
      'An AI-powered productivity concept that converts messy notes, documents, and unstructured tasks into three prioritized actionable steps with useful snippets or templates.',
    problem: "Notes, documents and loose tasks pile up, and it isn't obvious what to do first.",
    solution:
      'SoloSense takes that unstructured input and turns it into three prioritized, actionable steps, with useful snippets or templates to get started right away.',
    highlights: [
      'Accepts messy notes, documents and unstructured tasks',
      'Returns three prioritized actionable steps',
      'Includes useful snippets or templates',
    ],
    tags: ['AI', 'Productivity', 'Task prioritization'],
    techStack: [],
    github: 'https://github.com/Sailajapunyamanthula/solosense',
    demo: 'https://solosense-a02usq1dy-solo-sense.vercel.app',
  },
  {
    id: 'verdantgrid',
    title: 'VerdantGrid',
    type: 'Concept',
    accent: 'emerald',
    art: 'verdantgrid',
    description:
      'A technology-driven platform concept connecting agricultural and roadside grass resources with preprocessing and bio-CNG production opportunities.',
    problem:
      'Agricultural and roadside grass resources need a way to reach preprocessing and bio-CNG production opportunities.',
    solution:
      'VerdantGrid is a platform concept that connects these grass resources with preprocessing and bio-CNG production, pairing sustainability with digital innovation.',
    highlights: [
      'Connects agricultural and roadside grass resources with production opportunities',
      'Links preprocessing and bio-CNG production',
      'Sustainability and digital innovation at its core',
    ],
    tags: ['Sustainability', 'Bio-CNG', 'Digital innovation'],
    techStack: [],
    demo: 'https://verdant-grid-connect-cng.lovable.app',
  },
  {
    id: 'finfluence',
    title: 'FinFluence',
    type: 'Concept',
    accent: 'violet',
    art: 'finfluence',
    description:
      'A financial education concept featuring short finance tips, interactive challenges, rewards, streaks, and badges.',
    problem: "Financial education is easy to put off when it isn't engaging.",
    solution:
      'FinFluence keeps learning light with short finance tips, interactive challenges, and rewards, streaks and badges that encourage coming back.',
    highlights: [
      'Short finance tips',
      'Interactive challenges',
      'Rewards, streaks and badges',
    ],
    tags: ['Finance education', 'Gamification', 'Learning'],
    techStack: [],
  },
  {
    id: 'automation',
    title: 'AI & Automation Projects',
    type: 'Collection',
    accent: 'cyan',
    art: 'automation',
    description:
      'Automation workflows that connect APIs, AI and everyday tools, including AI-powered news summaries, resume analysis, email automation and productivity integrations.',
    problem: 'Repetitive, manual tasks take time that could go to more valuable work.',
    solution: 'Workflows that chain APIs and AI to handle the repetitive steps automatically.',
    highlights: [
      'API-based workflows',
      'AI-powered summaries and analysis',
      'Email and productivity integrations',
    ],
    tags: ['Automation', 'APIs', 'AI'],
    techStack: [],
    workflows: [
      { title: 'AI-powered news summaries', detail: null },
      { title: 'Resume analysis', detail: null },
      { title: 'Email automation', detail: null },
      { title: 'Productivity integrations', detail: null },
      { title: 'API-based workflows', detail: null },
    ],
  },
];
