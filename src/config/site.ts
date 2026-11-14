/**
 * Single place to edit personal details.
 * Anything left as an empty string shows up on the page as a clearly marked placeholder.
 */
export interface SiteConfig {
  name: string;
  shortName: string;
  monogram: string;
  roles: string[];
  tagline: string;
  intro: string;
  status: string;
  /** Path to a photo in /public, e.g. "/images/sailaja.jpg". Leave empty to show the placeholder. */
  profileImage: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  resume: { url: string; fileName: string };
  form: { web3formsKey: string; endpoint: string };
  closing: string;
}

export const site: SiteConfig = {
  name: 'Sailaja Punyamanthula',
  shortName: 'Sailaja',
  monogram: 'SP',
  roles: ['Aspiring Software Developer', 'AI & ML Enthusiast'],
  tagline: 'Building intelligent solutions and meaningful digital experiences through technology.',
  intro:
    'Computer Science and Engineering student specializing in AI & ML, curious about how software, data and automation can solve practical problems.',
  status: 'B.Tech CSE (AI & ML) student at UCEK',
  profileImage: '',
  contact: {
    email: '', // e.g. 'name@example.com'
    phone: '', // e.g. '+91 00000 00000'
    location: '', // e.g. 'City, State, India'
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
    github: 'https://github.com/Sailajapunyamanthula',
  },
  resume: {
    url: '/resume/Sailaja_Punyamanthula_Resume.pdf',
    fileName: 'Sailaja_Punyamanthula_Resume.pdf',
  },
  form: {
    web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY ?? '',
    endpoint: import.meta.env.VITE_FORM_ENDPOINT ?? '',
  },
  closing: 'Always learning, always building. Thanks for stopping by.',
};

export const hasValue = (value: string | null | undefined): value is string =>
  typeof value === 'string' && value.trim().length > 0;
