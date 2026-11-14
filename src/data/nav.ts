export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Every section on the page, in order. Used for active-link tracking. */
export const sectionIds = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'achievements',
  'certifications',
  'education',
  'contact',
] as const;
