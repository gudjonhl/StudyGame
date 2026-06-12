import { randInt, pick, shuffle } from '../random';
import type { Level } from '../../storage/schema';
import type { Question, SessionConfig } from '../types';
import { MATH_TASKS, type MathTaskId } from './levels';

/**
 * Pure problem generators. Conventions match Icelandic school notation:
 * '·' for multiplication, ':' for division, '−' (U+2212) for minus,
 * decimal comma in decimal numbers. Prompts never use thousands separators
 * so they stay unambiguous.
 */

export const MINUS = '−';

function fmtInt(n: number): string {
  return n < 0 ? `${MINUS}${Math.abs(n)}` : String(n);
}

/** Format an integer scaled value with `decimals` decimal places, comma-separated. */
export function fmtScaled(scaled: number, decimals: number): string {
  const neg = scaled < 0;
  const abs = Math.abs(scaled);
  const base = 10 ** decimals;
  const whole = Math.floor(abs / base);
  const frac = String(abs % base).padStart(decimals, '0');
  return `${neg ? MINUS : ''}${whole},${frac}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function numeric(prompt: string, answer: number): Question {
  return { kind: 'numeric', prompt, answer };
}

/** Multiple choice from a candidate distractor list (deduped, ≠ correct). */
function mcFrom(prompt: string, correct: string, candidates: string[]): Question {
  const distractors = [...new Set(candidates)].filter((c) => c !== correct).slice(0, 3);
  const choices = shuffle([correct, ...distractors]);
  return { kind: 'choice', prompt, choices, correctIndex: choices.indexOf(correct) };
}

// --- Samlagning og frádráttur ---

function genAddSub(level: Level): Question {
  if (level === 1) {
    if (Math.random() < 0.5) {
      const a = randInt(11, 89);
      const b = randInt(2, 100 - a);
      return numeric(`${a} + ${b}`, a + b);
    }
    const a = randInt(20, 99);
    const b = randInt(2, a - 1);
    return numeric(`${a} ${MINUS} ${b}`, a - b);
  }
  if (level === 2) {
    if (Math.random() < 0.5) {
      const a = randInt(123, 8765);
      const b = randInt(57, 9999 - a);
      return numeric(`${a} + ${b}`, a + b);
    }
    const a = randInt(500, 9999);
    const b = randInt(57, a - 1);
    return numeric(`${a} ${MINUS} ${b}`, a - b);
  }
  // Level 3: half large numbers, half negative numbers.
  if (Math.random() < 0.5) {
    if (Math.random() < 0.5) {
      const a = randInt(1234, 19999);
      const b = randInt(567, 9999);
      return numeric(`${a} + ${b}`, a + b);
    }
    const a = randInt(5000, 19999);
    const b = randInt(567, a - 1);
    return numeric(`${a} ${MINUS} ${b}`, a - b);
  }
  const a = randInt(-50, 99);
  const b = randInt(-50, 99);
  const bStr = b < 0 ? `(${fmtInt(b)})` : String(b);
  if (Math.random() < 0.5) return numeric(`${fmtInt(a)} + ${bStr}`, a + b);
  return numeric(`${fmtInt(a)} ${MINUS} ${bStr}`, a - b);
}

// --- Margföldunartöflur ---

function genTables(level: Level): Question {
  if (level === 1) {
    const a = randInt(2, 5);
    const b = randInt(2, 10);
    return numeric(`${a} · ${b}`, a * b);
  }
  if (level === 2) {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    return numeric(`${a} · ${b}`, a * b);
  }
  if (Math.random() < 0.5) {
    const a = randInt(3, 12);
    const b = randInt(3, 12);
    return numeric(`${a} · ${b}`, a * b);
  }
  const d = randInt(3, 12);
  const q = randInt(3, 12);
  return numeric(`${d * q} : ${d}`, q);
}

// --- Margföldun ---

function genMultiply(level: Level): Question {
  if (level <= 2) {
    const a = randInt(12, 99);
    const b = randInt(3, 9);
    return numeric(`${a} · ${b}`, a * b);
  }
  if (Math.random() < 0.5) {
    const a = randInt(12, 99);
    const b = randInt(12, 99);
    return numeric(`${a} · ${b}`, a * b);
  }
  const a = randInt(112, 999);
  const b = randInt(3, 9);
  return numeric(`${a} · ${b}`, a * b);
}

// --- Deiling ---

function genDivide(level: Level): Question {
  const d = randInt(3, 9);
  const q = level <= 2 ? randInt(3, 12) : randInt(13, 120);
  return numeric(`${d * q} : ${d}`, q);
}

// --- Brot ---

const FRAC_DEC: [string, string][] = [
  ['1/2', '0,5'],
  ['1/4', '0,25'],
  ['3/4', '0,75'],
  ['1/5', '0,2'],
  ['2/5', '0,4'],
  ['3/5', '0,6'],
  ['4/5', '0,8'],
  ['1/10', '0,1'],
  ['3/10', '0,3'],
  ['7/10', '0,7'],
  ['1/8', '0,125'],
];

function genFractions(level: Level): Question {
  if (level <= 2) {
    const variant = randInt(1, 3);
    if (variant === 1) {
      // Compare with same denominator.
      const d = randInt(5, 12);
      const n1 = randInt(1, d - 1);
      let n2 = randInt(1, d - 1);
      while (n2 === n1) n2 = randInt(1, d - 1);
      const correct = `${Math.max(n1, n2)}/${d}`;
      return mcFrom(`Hvort er stærra: ${n1}/${d} eða ${n2}/${d}?`, correct, [`${Math.min(n1, n2)}/${d}`]);
    }
    if (variant === 2) {
      // Add with same denominator.
      const d = randInt(5, 12);
      const n1 = randInt(1, d - 3);
      const n2 = randInt(1, d - 1 - n1);
      const s = n1 + n2;
      return mcFrom(`${n1}/${d} + ${n2}/${d} = ?`, `${s}/${d}`, [`${s}/${d * 2}`, `${s + 1}/${d}`, `${Math.max(1, s - 1)}/${d}`]);
    }
    // Fraction of an amount (numeric).
    const d = pick([2, 3, 4, 5, 10]);
    const r = randInt(2, 12);
    return numeric(`Hvað er 1/${d} af ${d * r}?`, r);
  }
  const variant = randInt(1, 3);
  if (variant === 1) {
    // Add with unlike denominators, answer reduced.
    const [d1, d2] = pick([
      [2, 3],
      [2, 4],
      [3, 4],
      [2, 5],
      [2, 6],
      [3, 6],
      [4, 6],
      [2, 8],
      [4, 8],
    ]);
    const n1 = randInt(1, d1 - 1);
    const n2 = randInt(1, d2 - 1);
    const den = (d1 * d2) / gcd(d1, d2);
    const num = n1 * (den / d1) + n2 * (den / d2);
    const g = gcd(num, den);
    const correct = `${num / g}/${den / g}`;
    return mcFrom(`${n1}/${d1} + ${n2}/${d2} = ?`, correct, [
      `${n1 + n2}/${d1 + d2}`,
      `${num}/${den}`,
      `${num / g + 1}/${den / g}`,
      `${num / g}/${den / g + 1}`,
    ]);
  }
  if (variant === 2) {
    // Fraction to decimal.
    const [frac, dec] = pick(FRAC_DEC);
    const others = FRAC_DEC.filter(([f]) => f !== frac).map(([, d]) => d);
    return mcFrom(`Hvaða tugabrot er jafnt og ${frac}?`, dec, shuffle(others));
  }
  // Compare with unlike denominators.
  const fracs: [number, number][] = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
    [2, 5],
    [3, 5],
    [5, 6],
    [1, 4],
    [5, 8],
  ];
  const a = pick(fracs);
  let b = pick(fracs);
  while (a[0] / a[1] === b[0] / b[1]) b = pick(fracs);
  const larger = a[0] / a[1] > b[0] / b[1] ? a : b;
  const smaller = larger === a ? b : a;
  return mcFrom(
    `Hvort er stærra: ${a[0]}/${a[1]} eða ${b[0]}/${b[1]}?`,
    `${larger[0]}/${larger[1]}`,
    [`${smaller[0]}/${smaller[1]}`],
  );
}

// --- Tugabrot ---

function genDecimals(level: Level): Question {
  if (level <= 2) {
    // Tenths, addition or subtraction, multiple choice.
    const a = randInt(10, 95); // tenths
    if (Math.random() < 0.5) {
      const b = randInt(5, 90);
      const s = a + b;
      return mcFrom(`${fmtScaled(a, 1)} + ${fmtScaled(b, 1)} = ?`, fmtScaled(s, 1), [
        fmtScaled(s + 1, 1),
        fmtScaled(s - 1, 1),
        fmtScaled(s + 10, 1),
      ]);
    }
    const b = randInt(5, a - 1);
    const s = a - b;
    return mcFrom(`${fmtScaled(a, 1)} ${MINUS} ${fmtScaled(b, 1)} = ?`, fmtScaled(s, 1), [
      fmtScaled(s + 1, 1),
      fmtScaled(Math.max(1, s - 1), 1),
      fmtScaled(s + 10, 1),
    ]);
  }
  const variant = randInt(1, 3);
  if (variant === 1) {
    // Hundredths addition.
    const a = randInt(100, 949);
    const b = randInt(50, 999);
    const s = a + b;
    return mcFrom(`${fmtScaled(a, 2)} + ${fmtScaled(b, 2)} = ?`, fmtScaled(s, 2), [
      fmtScaled(s + 10, 2),
      fmtScaled(s - 10, 2),
      fmtScaled(s + 100, 2),
    ]);
  }
  if (variant === 2) {
    // Multiply by 10: 3,45 · 10 = 34,5
    const a = randInt(101, 999); // hundredths
    return mcFrom(`${fmtScaled(a, 2)} · 10 = ?`, fmtScaled(a, 1), [
      fmtScaled(a, 2),
      fmtScaled(a * 10, 1),
      fmtScaled(a, 3),
    ]);
  }
  // Divide by 10: 45,6 : 10 = 4,56
  const a = randInt(101, 999); // tenths
  return mcFrom(`${fmtScaled(a, 1)} : 10 = ?`, fmtScaled(a, 2), [
    fmtScaled(a, 1),
    fmtScaled(a, 3),
    fmtScaled(a * 10, 2),
  ]);
}

// --- Prósentur ---

const PERCENT_STEP: Record<number, number> = { 10: 10, 20: 5, 25: 4, 50: 2, 75: 4 };

function genPercent(): Question {
  const p = pick([10, 20, 25, 50, 75]);
  const base = PERCENT_STEP[p] * randInt(3, 40);
  return numeric(`${p}% af ${base}`, (base * p) / 100);
}

// --- Jöfnur ---

function genEquations(): Question {
  const variant = randInt(1, 3);
  if (variant === 1) {
    const x = randInt(3, 80);
    const a = randInt(5, 60);
    return numeric(`x + ${a} = ${x + a}`, x);
  }
  if (variant === 2) {
    const a = randInt(3, 40);
    const b = randInt(2, 60);
    return numeric(`x ${MINUS} ${a} = ${b}`, a + b);
  }
  const a = randInt(3, 9);
  const x = randInt(3, 12);
  return numeric(`${a} · x = ${a * x}`, x);
}

// --- Session builder ---

export function genQuestion(taskId: MathTaskId, level: Level): Question {
  switch (taskId) {
    case 'addsub':
      return genAddSub(level);
    case 'tables':
      return genTables(level);
    case 'multiply':
      return genMultiply(level);
    case 'divide':
      return genDivide(level);
    case 'fractions':
      return genFractions(level);
    case 'decimals':
      return genDecimals(level);
    case 'percent':
      return genPercent();
    case 'equations':
      return genEquations();
  }
}

export const MATH_SESSION_SIZE = 10;

export function generateMathSession(taskId: MathTaskId, level: Level): SessionConfig {
  const def = MATH_TASKS.find((t) => t.id === taskId);
  if (!def) throw new Error(`Óþekkt verkefni: ${taskId}`);
  const questions: Question[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (questions.length < MATH_SESSION_SIZE && guard++ < 300) {
    const q = genQuestion(taskId, level);
    if (q.kind !== 'match') {
      if (seen.has(q.prompt)) continue;
      seen.add(q.prompt);
    }
    questions.push(q);
  }
  return {
    subject: 'math',
    taskType: taskId,
    taskLabel: def.label,
    level,
    questions,
    pointsPerCorrect: 10,
    perfectBonus: 20,
  };
}
