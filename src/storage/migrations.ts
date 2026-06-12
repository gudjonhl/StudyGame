import { CURRENT_SCHEMA_VERSION, type AppState } from './schema';

/**
 * Ordered migrations: migrations[n] upgrades data from schemaVersion n to n+1.
 * v1 is the first version so the table is empty, but the mechanism runs from
 * day one so future schema changes never lose anyone's points.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const migrations: Record<number, (data: any) => any> = {};

export function migrate(data: unknown): AppState {
  if (typeof data !== 'object' || data === null || !('schemaVersion' in data)) {
    throw new Error('Ógild gögn: schemaVersion vantar');
  }
  let current = data as { schemaVersion: number };
  if (current.schemaVersion > CURRENT_SCHEMA_VERSION) {
    throw new Error('Gögnin koma úr nýrri útgáfu af forritinu');
  }
  while (current.schemaVersion < CURRENT_SCHEMA_VERSION) {
    const step = migrations[current.schemaVersion];
    if (!step) throw new Error(`Vantar uppfærslu frá útgáfu ${current.schemaVersion}`);
    current = step(current);
  }
  return current as unknown as AppState;
}
