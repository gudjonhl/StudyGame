import type { Level } from '../../storage/schema';

export type MathTaskId =
  | 'addsub'
  | 'tables'
  | 'multiply'
  | 'divide'
  | 'fractions'
  | 'decimals'
  | 'percent'
  | 'equations';

export interface MathTaskDef {
  id: MathTaskId;
  label: string;
  icon: string;
  levels: Level[];
}

export const MATH_TASKS: MathTaskDef[] = [
  { id: 'addsub', label: 'Samlagning og frádráttur', icon: '➕', levels: [1, 2, 3] },
  { id: 'tables', label: 'Margföldunartöflur', icon: '✖️', levels: [1, 2, 3] },
  { id: 'multiply', label: 'Margföldun', icon: '🧮', levels: [2, 3] },
  { id: 'divide', label: 'Deiling', icon: '➗', levels: [2, 3] },
  { id: 'fractions', label: 'Brot', icon: '🍕', levels: [2, 3] },
  { id: 'decimals', label: 'Tugabrot', icon: '🔢', levels: [2, 3] },
  { id: 'percent', label: 'Prósentur', icon: '💯', levels: [3] },
  { id: 'equations', label: 'Jöfnur', icon: '⚖️', levels: [3] },
];

export function tasksForLevel(level: Level): MathTaskDef[] {
  return MATH_TASKS.filter((t) => t.levels.includes(level));
}
