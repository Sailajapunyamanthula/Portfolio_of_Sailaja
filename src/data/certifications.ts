export type CertCategory =
  | 'Programming'
  | 'Web & foundations'
  | 'Databases'
  | 'Build & launch'
  | 'GenAI & automation';

export interface Certification {
  id: string;
  title: string;
  category: CertCategory;
  /** Fill in only what you can verify. null shows an editable placeholder. */
  issuer: string | null;
  issued: string | null;
  credentialId: string | null;
  verifyUrl: string | null;
  /** Path to a certificate image in /public, e.g. "/certs/python.png". */
  image: string | null;
}

export const certCategories: CertCategory[] = [
  'Programming',
  'Web & foundations',
  'Databases',
  'Build & launch',
  'GenAI & automation',
];

const blank = { issued: null, credentialId: null, verifyUrl: null, image: null } as const;

export const certifications: Certification[] = [
  { id: 'python', title: 'Python Foundations', category: 'Programming', issuer: null, ...blank },
  { id: 'javascript', title: 'JavaScript Essentials', category: 'Programming', issuer: null, ...blank },
  { id: 'java', title: 'Scaler Java', category: 'Programming', issuer: 'Scaler', ...blank },
  { id: 'devfoundations', title: 'Developer Foundations', category: 'Web & foundations', issuer: null, ...blank },
  {
    id: 'static-responsive',
    title: 'Static and Responsive Websites',
    category: 'Web & foundations',
    issuer: null,
    ...blank,
  },
  { id: 'databases', title: 'Introduction to Databases', category: 'Databases', issuer: null, ...blank },
  {
    id: 'mvp',
    title: 'NxtWave Build and Launch MVP',
    category: 'Build & launch',
    issuer: 'NxtWave',
    ...blank,
  },
  {
    id: 'mcp-genai',
    title: 'MCP Mega Workshop and GenAI / Automation certifications',
    category: 'GenAI & automation',
    issuer: null,
    ...blank,
  },
];
