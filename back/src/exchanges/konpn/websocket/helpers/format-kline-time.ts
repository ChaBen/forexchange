import { Period } from '../../types';
import { getPeriodSecond } from './get-period-second';

export function formatKlineTime(tick: number, period: Period): number {
  const unitTime = getPeriodSecond(period);

  return Math.floor(tick / unitTime) * unitTime;
}
