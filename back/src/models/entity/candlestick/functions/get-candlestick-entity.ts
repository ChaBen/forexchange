import { Period } from '../candlestick.repository';
import {
  CandlestickDayEntity,
  CandlestickHour2Entity,
  CandlestickHour4Entity,
  CandlestickHourEntity,
  CandlestickMin15Entity,
  CandlestickEntity,
  CandlestickMin30Entity,
  CandlestickMin5Entity,
} from '../candlestick.entity';

export function getCandlestickEntity(period: Period): typeof CandlestickEntity {
  switch (period) {
    case Period.min1:
      return CandlestickEntity;
    case Period.min5:
      return CandlestickMin5Entity;
    case Period.min15:
      return CandlestickMin15Entity;
    case Period.min30:
      return CandlestickMin30Entity;
    case Period.hour:
      return CandlestickHourEntity;
    case Period.hour2:
      return CandlestickHour2Entity;
    case Period.hour4:
      return CandlestickHour4Entity;
    case Period.day:
      return CandlestickDayEntity;
  }
}
