import type { Level } from '../storage/schema';

export interface ReadingQuestion {
  prompt: string;
  choices: string[]; // 2–4 options
  correctIndex: number; // index into choices as written here (shuffled at session time)
}

export interface ReadingText {
  id: string;
  language: 'da' | 'is' | 'en';
  level: Level;
  title: string;
  body: string; // '\n\n' separates paragraphs
  /** Danish texts only: tappable words with Icelandic translations. */
  glossary?: { word: string; translation: string }[];
  questions: ReadingQuestion[];
}

export interface VocabPair {
  id: string;
  da: string;
  is: string;
  category: string;
  level: Level;
}
