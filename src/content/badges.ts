import type { SessionRecord, SubjectId } from '../storage/schema';

export interface BadgeContext {
  /** This kid's completed sessions, including the one just finished. */
  sessions: SessionRecord[];
  totalEarned: number;
  streakLongest: number;
  level: number;
  approvedRedemptions: number;
}

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  check(ctx: BadgeContext): boolean;
}

const ALL_SUBJECTS: SubjectId[] = ['math', 'danish', 'icelandic', 'english'];

export const BADGES: BadgeDef[] = [
  {
    id: 'first-session',
    name: 'Fyrsta skrefið',
    description: 'Kláraðir fyrsta verkefnið þitt',
    icon: '🎯',
    check: (c) => c.sessions.length >= 1,
  },
  {
    id: 'first-perfect',
    name: 'Fullkomið!',
    description: 'Allt rétt í einu verkefni',
    icon: '🌟',
    check: (c) => c.sessions.some((s) => s.total > 0 && s.correct === s.total),
  },
  {
    id: 'streak-3',
    name: 'Þriggja daga röð',
    description: 'Æfðir þig þrjá daga í röð',
    icon: '🔥',
    check: (c) => c.streakLongest >= 3,
  },
  {
    id: 'streak-7',
    name: 'Sjö daga röð',
    description: 'Æfðir þig sjö daga í röð',
    icon: '🚀',
    check: (c) => c.streakLongest >= 7,
  },
  {
    id: 'points-500',
    name: '500 stig',
    description: 'Safnaðir 500 stigum samtals',
    icon: '💎',
    check: (c) => c.totalEarned >= 500,
  },
  {
    id: 'points-2000',
    name: '2000 stig',
    description: 'Safnaðir 2000 stigum samtals',
    icon: '👑',
    check: (c) => c.totalEarned >= 2000,
  },
  {
    id: 'all-subjects',
    name: 'Fjölfræðingur',
    description: 'Kláraðir verkefni í öllum námsgreinum',
    icon: '🧠',
    check: (c) => ALL_SUBJECTS.every((sub) => c.sessions.some((s) => s.subject === sub)),
  },
  {
    id: 'danish-10',
    name: 'Danskur bókaormur',
    description: 'Last tíu danska texta',
    icon: '📚',
    check: (c) => c.sessions.filter((s) => s.subject === 'danish' && s.taskType === 'reading').length >= 10,
  },
  {
    id: 'vocab-10',
    name: 'Orðasafnari',
    description: 'Kláraðir tíu orðaforðaverkefni',
    icon: '🦉',
    check: (c) => c.sessions.filter((s) => s.taskType === 'vocab-mc' || s.taskType === 'vocab-match').length >= 10,
  },
  {
    id: 'level-5',
    name: 'Stjörnunemandi',
    description: 'Náðir þrepi 5',
    icon: '⭐',
    check: (c) => c.level >= 5,
  },
  {
    id: 'first-reward',
    name: 'Fyrstu verðlaunin',
    description: 'Fékkst fyrstu verðlaunin þín',
    icon: '🎁',
    check: (c) => c.approvedRedemptions >= 1,
  },
];

export function getBadge(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}
