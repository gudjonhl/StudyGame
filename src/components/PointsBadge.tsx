import { formatNum } from '../utils';
import { STR } from '../i18n/strings';

interface Props {
  points: number;
  big?: boolean;
}

export function PointsBadge({ points, big }: Props) {
  return (
    <span className={`points-badge${big ? ' big' : ''}`}>
      ⭐ {formatNum(points)} <span className="points-unit">{STR.common.points}</span>
    </span>
  );
}
