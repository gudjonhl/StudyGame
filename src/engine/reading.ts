import type { KidProfile, SessionRecord, SubjectId } from '../storage/schema';
import type { ReadingText } from '../content/types';
import type { Question, SessionConfig } from './types';
import { pick, shuffle } from './random';

/**
 * Pick a text the kid hasn't read yet (at or below their level) and build a
 * session from it. When every text has been read, the least recently read one
 * comes back around.
 */
export function buildReadingSession(
  subject: SubjectId,
  kid: KidProfile,
  texts: ReadingText[],
  sessions: SessionRecord[],
): SessionConfig | null {
  if (texts.length === 0) return null;
  const lvl = kid.difficulty[subject];
  let pool = texts.filter((t) => t.level <= lvl);
  if (pool.length === 0) pool = texts.slice();

  const lastRead = new Map<string, string>();
  for (const s of sessions) {
    if (s.kidId !== kid.id || !s.contentId) continue;
    const prev = lastRead.get(s.contentId);
    if (!prev || s.completedAt > prev) lastRead.set(s.contentId, s.completedAt);
  }

  const unseen = pool.filter((t) => !lastRead.has(t.id));
  const text = unseen.length
    ? pick(unseen)
    : pool.reduce((oldest, t) => ((lastRead.get(t.id) ?? '') < (lastRead.get(oldest.id) ?? '') ? t : oldest));

  const questions: Question[] = text.questions.map((q) => {
    const choices = shuffle(q.choices);
    return {
      kind: 'choice',
      prompt: q.prompt,
      choices,
      correctIndex: choices.indexOf(q.choices[q.correctIndex]),
    };
  });

  return {
    subject,
    taskType: 'reading',
    taskLabel: `Lestur: ${text.title}`,
    level: text.level,
    contentId: text.id,
    reading: { title: text.title, body: text.body, glossary: text.glossary },
    questions,
    pointsPerCorrect: 15,
    perfectBonus: 20,
  };
}
