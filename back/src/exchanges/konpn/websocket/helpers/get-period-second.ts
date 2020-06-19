import { Period } from '../../types';

export function getPeriodSecond(period: Period): number {
  switch (period) {
    case Period.min1:
      return 60;
    case Period.min5:
      return 60 * 5;
    case Period.min10:
      return 60 * 10;
    case Period.min15:
      return 60 * 15;
    case Period.min30:
      return 60 * 30;
    case Period.hour:
      return 60 * 60;
    case Period.hour2:
      return 60 * 60 * 2;
    case Period.hour4:
      return 60 * 60 * 4;
    case Period.day:
      return 60 * 60 * 24;
  }
}
