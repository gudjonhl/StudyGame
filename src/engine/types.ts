import type { Level, SubjectId } from '../storage/schema';

export type Question =
  | { kind: 'numeric'; prompt: string; answer: number }
  | { kind: 'choice'; prompt: string; choices: string[]; correctIndex: number }
  | { kind: 'match'; pairs: { left: string; right: string }[] };

export interface ReadingBody {
  title: string;
  body: string; // '\n\n' separates paragraphs
  glossary?: { word: string; translation: string }[];
}

export interface SessionConfig {
  subject: SubjectId;
  taskType: string;
  taskLabel: string;
  level: Level;
  contentId?: string;
  reading?: ReadingBody;
  questions: Question[];
  pointsPerCorrect: number;
  perfectBonus: number;
}

/**
 * Holds the active session config in memory between the subject-select screen
 * and the session screen. Deliberately not persisted: a refresh mid-session
 * simply returns to the dashboard.
 */
let current: SessionConfig | null = null;

export const sessionHolder = {
  set(config: SessionConfig) {
    current = config;
  },
  get(): SessionConfig | null {
    return current;
  },
  clear() {
    current = null;
  },
};
