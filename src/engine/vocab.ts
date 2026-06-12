import type { KidProfile } from '../storage/schema';
import type { VocabPair } from '../content/types';
import type { Question, SessionConfig } from './types';
import { sample, shuffle } from './random';

export const MATCH_ROUNDS = 3;
export const MATCH_PAIRS_PER_ROUND = 5;
export const MATCH_ROUND_POINTS = 15;
export const MATCH_ROUND_FLOOR = 5;

/** 10 multiple-choice questions; direction flips Danish↔Icelandic per question. */
export function buildVocabMcSession(kid: KidProfile, pairs: VocabPair[]): SessionConfig {
  const lvl = kid.difficulty.danish;
  let pool = pairs.filter((p) => p.level <= lvl);
  if (pool.length < 10) pool = pairs.slice();
  const chosen = sample(pool, Math.min(10, pool.length));

  const questions: Question[] = chosen.map((p) => {
    const daToIs = Math.random() < 0.5;
    const correct = daToIs ? p.is : p.da;
    const sameCategory = pool.filter((o) => o.id !== p.id && o.category === p.category);
    const distractorPool = sameCategory.length >= 3 ? sameCategory : pool.filter((o) => o.id !== p.id);
    const seen = new Set([correct]);
    const distractors: string[] = [];
    for (const o of shuffle(distractorPool)) {
      const w = daToIs ? o.is : o.da;
      if (!seen.has(w)) {
        seen.add(w);
        distractors.push(w);
      }
      if (distractors.length === 3) break;
    }
    const choices = shuffle([correct, ...distractors]);
    const prompt = daToIs ? `Hvað þýðir „${p.da}“?` : `Hvað er „${p.is}“ á dönsku?`;
    return { kind: 'choice', prompt, choices, correctIndex: choices.indexOf(correct) };
  });

  return {
    subject: 'danish',
    taskType: 'vocab-mc',
    taskLabel: 'Orðaforði – fjölval',
    level: lvl,
    questions,
    pointsPerCorrect: 5,
    perfectBonus: 10,
  };
}

/** 3 matching rounds of 5 Danish↔Icelandic pairs each. */
export function buildVocabMatchSession(kid: KidProfile, pairs: VocabPair[]): SessionConfig {
  const lvl = kid.difficulty.danish;
  let pool = pairs.filter((p) => p.level <= lvl);
  if (pool.length < MATCH_ROUNDS * MATCH_PAIRS_PER_ROUND) pool = pairs.slice();
  const chosen = sample(pool, Math.min(MATCH_ROUNDS * MATCH_PAIRS_PER_ROUND, pool.length));

  const questions: Question[] = [];
  for (let r = 0; r < MATCH_ROUNDS; r++) {
    const chunk = chosen.slice(r * MATCH_PAIRS_PER_ROUND, (r + 1) * MATCH_PAIRS_PER_ROUND);
    if (chunk.length < 2) break;
    questions.push({ kind: 'match', pairs: chunk.map((p) => ({ left: p.da, right: p.is })) });
  }

  return {
    subject: 'danish',
    taskType: 'vocab-match',
    taskLabel: 'Orðaforði – pörun',
    level: lvl,
    questions,
    pointsPerCorrect: MATCH_ROUND_POINTS,
    perfectBonus: 0,
  };
}
