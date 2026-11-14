import type { Accent } from '../../../types';
import type { TagTone } from '../../ui/Tag';

export const accentTone: Record<Accent, TagTone> = {
  cyan: 'cyan',
  violet: 'violet',
  emerald: 'emerald',
};

export const accentText: Record<Accent, string> = {
  cyan: 'text-cyan',
  violet: 'text-violet-300',
  emerald: 'text-emerald-300',
};
