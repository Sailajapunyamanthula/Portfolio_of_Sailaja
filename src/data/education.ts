export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  affiliation?: string;
  cgpa?: string;
  /** Editable. null shows a placeholder. */
  period: string | null;
  graduationYear: string | null;
  placeholder?: boolean;
}

export const education: EducationItem[] = [
  {
    id: 'btech',
    degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
    institution: 'University College of Engineering Kakinada (UCEK)',
    affiliation: 'JNTUK',
    cgpa: '8.8',
    period: null,
    graduationYear: null,
  },
  {
    id: 'earlier',
    degree: 'Earlier education',
    institution: 'Add school or college details here',
    period: null,
    graduationYear: null,
    placeholder: true,
  },
];
