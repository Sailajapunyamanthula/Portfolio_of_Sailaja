import { Flame, Medal, Rocket, Trophy, type LucideIcon } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  stat: string;
  statLabel: string;
  icon: LucideIcon;
}

/** Keep descriptions factual. Edit freely. */
export const achievements: Achievement[] = [
  {
    id: 'buildathon',
    title: 'OpenAI Academy x NxtWave Regional Buildathon AP 2025',
    detail: 'SoloSense project.',
    stat: '2025',
    statLabel: 'Regional Buildathon',
    icon: Rocket,
  },
  {
    id: 'hackfest',
    title: 'CMR HackFest 3.0',
    detail: '36-hour hackathon, CodeSparks, 2026.',
    stat: '36h',
    statLabel: 'Hackathon',
    icon: Trophy,
  },
  {
    id: 'leaderboard',
    title: 'NxtWave leaderboard',
    detail: 'Ranked #1 during May 5 to 18.',
    stat: '#1',
    statLabel: 'Leaderboard rank',
    icon: Medal,
  },
  {
    id: 'streak',
    title: 'CCBP coding streak',
    detail: '190-day coding streak.',
    stat: '190',
    statLabel: 'Day streak',
    icon: Flame,
  },
];
