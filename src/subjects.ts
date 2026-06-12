import type { SubjectId } from './storage/schema';
import { STR } from './i18n/strings';

export interface SubjectMeta {
  id: SubjectId;
  label: string;
  icon: string;
  color: string; // CSS color value
}

export const SUBJECTS: SubjectMeta[] = [
  { id: 'math', label: STR.subjects.math, icon: '🧮', color: 'var(--c-math)' },
  // Swan for H.C. Andersen — flag emojis render as plain letters on Windows.
  { id: 'danish', label: STR.subjects.danish, icon: '🦢', color: 'var(--c-danish)' },
  { id: 'icelandic', label: STR.subjects.icelandic, icon: '📖', color: 'var(--c-icelandic)' },
  { id: 'english', label: STR.subjects.english, icon: '🌍', color: 'var(--c-english)' },
];

export function subjectMeta(id: string): SubjectMeta {
  return SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
}
