export interface ExperienceItem {
  id: string;
  company: string;
  companyNote?: string;
  role: string;
  /** Set to a string like "Jun 2025 - Aug 2025" once confirmed. null shows an editable placeholder. */
  period: string | null;
  /** Confirmed responsibilities. */
  responsibilities: string[];
  /** Shows a dashed "add more" line under the list when true. */
  allowMorePlaceholder?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: 'edvanta',
    company: 'Edvanta Edutech Private Limited',
    role: 'Business Development Associate (BDA)',
    period: null,
    responsibilities: [
      'Supported business development activities.',
      'Handled day-to-day communication and customer interaction.',
      'Coordinated tasks and communication to keep work moving.',
    ],
    allowMorePlaceholder: true,
  },
  {
    id: 'nextgenpros',
    company: 'NextGenProsInc',
    companyNote: 'Tao Digitals Company',
    role: 'Data Analyst',
    period: null,
    responsibilities: [
      'Carried out data annotation tasks with attention to detail.',
      'Identified key frames in video data.',
      'Performed voice-based annotation.',
      'Performed facial annotation.',
    ],
  },
];
