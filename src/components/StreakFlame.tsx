import { STR } from '../i18n/strings';

interface Props {
  days: number;
}

export function StreakFlame({ days }: Props) {
  return (
    <span className={`streak-flame${days === 0 ? ' inactive' : ''}`} title={STR.dashboard.streakDays(days)}>
      🔥 {days}
    </span>
  );
}
