import { describe, expect, it } from 'vitest';
import { genQuestion, generateMathSession, MATH_SESSION_SIZE, MINUS } from './generator';
import { MATH_TASKS } from './levels';
import type { Level } from '../../storage/schema';
import type { Question } from '../types';

const RUNS = 150;

function parseNum(s: string): number {
  return Number(s.replace(/[()]/g, '').replace(MINUS, '-').replace(',', '.'));
}

/** Verify a 'A op B' prompt against its answer. */
function checkBinary(prompt: string, answer: number) {
  const core = prompt.replace(' = ?', '');
  const m = core.match(/^(\(?−?[\d,]+\)?) ([+−·:]) (\(?−?[\d,]+\)?)$/);
  expect(m, `prompt did not parse: ${prompt}`).not.toBeNull();
  const a = parseNum(m![1]);
  const b = parseNum(m![3]);
  const expected = m![2] === '+' ? a + b : m![2] === '−' ? a - b : m![2] === '·' ? a * b : a / b;
  expect(answer, prompt).toBe(expected);
}

function checkChoiceInvariants(q: Question & { kind: 'choice' }) {
  expect(q.choices.length).toBeGreaterThanOrEqual(2);
  expect(q.choices.length).toBeLessThanOrEqual(4);
  expect(new Set(q.choices).size).toBe(q.choices.length);
  expect(q.correctIndex).toBeGreaterThanOrEqual(0);
  expect(q.correctIndex).toBeLessThan(q.choices.length);
}

describe('math generators', () => {
  const arithmeticTasks = ['addsub', 'tables', 'multiply', 'divide'] as const;

  for (const taskId of arithmeticTasks) {
    const def = MATH_TASKS.find((t) => t.id === taskId)!;
    for (const level of def.levels) {
      it(`${taskId} level ${level} produces correct answers`, () => {
        for (let i = 0; i < RUNS; i++) {
          const q = genQuestion(taskId, level);
          expect(q.kind).toBe('numeric');
          if (q.kind === 'numeric') {
            checkBinary(q.prompt, q.answer);
            expect(Number.isInteger(q.answer)).toBe(true);
          }
        }
      });
    }
  }

  it('addsub level 1 stays within 100 and never negative', () => {
    for (let i = 0; i < RUNS; i++) {
      const q = genQuestion('addsub', 1);
      if (q.kind === 'numeric') {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThanOrEqual(100);
      }
    }
  });

  it('tables level 1 uses small factors', () => {
    for (let i = 0; i < RUNS; i++) {
      const q = genQuestion('tables', 1);
      if (q.kind === 'numeric') expect(q.answer).toBeLessThanOrEqual(50);
    }
  });

  it('fractions produce valid questions at both levels', () => {
    for (const level of [2, 3] as Level[]) {
      for (let i = 0; i < RUNS; i++) {
        const q = genQuestion('fractions', level);
        if (q.kind === 'choice') {
          checkChoiceInvariants(q);
        } else if (q.kind === 'numeric') {
          // 'Hvað er 1/d af N?' — N/d must equal the answer.
          const m = q.prompt.match(/^Hvað er 1\/(\d+) af (\d+)\?$/);
          expect(m, q.prompt).not.toBeNull();
          expect(q.answer).toBe(Number(m![2]) / Number(m![1]));
        }
      }
    }
  });

  it('decimals choice questions contain the right answer', () => {
    for (const level of [2, 3] as Level[]) {
      for (let i = 0; i < RUNS; i++) {
        const q = genQuestion('decimals', level);
        expect(q.kind).toBe('choice');
        if (q.kind !== 'choice') continue;
        checkChoiceInvariants(q);
        const core = q.prompt.replace(' = ?', '');
        const m = core.match(/^([\d,]+) ([+−·:]) ([\d,]+)$/);
        expect(m, q.prompt).not.toBeNull();
        const a = parseNum(m![1]);
        const b = parseNum(m![3]);
        const expected = m![2] === '+' ? a + b : m![2] === '−' ? a - b : m![2] === '·' ? a * b : a / b;
        expect(parseNum(q.choices[q.correctIndex])).toBeCloseTo(expected, 9);
      }
    }
  });

  it('percent answers are correct integers', () => {
    for (let i = 0; i < RUNS; i++) {
      const q = genQuestion('percent', 3);
      expect(q.kind).toBe('numeric');
      if (q.kind !== 'numeric') continue;
      const m = q.prompt.match(/^(\d+)% af (\d+)$/);
      expect(m, q.prompt).not.toBeNull();
      expect(q.answer).toBe((Number(m![2]) * Number(m![1])) / 100);
      expect(Number.isInteger(q.answer)).toBe(true);
    }
  });

  it('equations solve for x', () => {
    for (let i = 0; i < RUNS; i++) {
      const q = genQuestion('equations', 3);
      expect(q.kind).toBe('numeric');
      if (q.kind !== 'numeric') continue;
      let m = q.prompt.match(/^x \+ (\d+) = (\d+)$/);
      if (m) {
        expect(q.answer).toBe(Number(m[2]) - Number(m[1]));
        continue;
      }
      m = q.prompt.match(/^x − (\d+) = (\d+)$/);
      if (m) {
        expect(q.answer).toBe(Number(m[1]) + Number(m[2]));
        continue;
      }
      m = q.prompt.match(/^(\d+) · x = (\d+)$/);
      expect(m, q.prompt).not.toBeNull();
      expect(q.answer).toBe(Number(m![2]) / Number(m![1]));
    }
  });

  it('every task/level combination builds a full session', () => {
    for (const def of MATH_TASKS) {
      for (const level of def.levels) {
        const session = generateMathSession(def.id, level);
        expect(session.questions.length).toBe(MATH_SESSION_SIZE);
        expect(session.subject).toBe('math');
        expect(session.taskType).toBe(def.id);
        expect(session.pointsPerCorrect).toBeGreaterThan(0);
      }
    }
  });
});
