import { Period, RestPeriod } from '../../../exchanges/konpn/types';
import { Period as CandlestickPeriod } from '../../../models/entity/candlestick';

export function transformResolution(resolution: string): Period {
  switch (resolution) {
    case '1':
      return Period.min1;
    case '5':
      return Period.min5;
    case '10':
      return Period.min10;
    case '15':
      return Period.min15;
    case '30':
      return Period.min30;
    case '60':
      return Period.hour;
    case '120':
      return Period.hour2;
    case '240':
      return Period.hour4;
    case 'D':
      return Period.day;
    case '1D':
      return Period.day;
  }
}

export function transformResolution4Rest(resolution: string): RestPeriod {
  switch (resolution) {
    case '1':
      return RestPeriod.min1;
    case '5':
      return RestPeriod.min5;
    case '10':
      return RestPeriod.min10;
    case '15':
      return RestPeriod.min15;
    case '30':
      return RestPeriod.min30;
    case '60':
      return RestPeriod.hour;
    case '120':
      return RestPeriod.hour2;
    case '240':
      return RestPeriod.hour4;
    case 'D':
      return RestPeriod.day;
    case '1D':
      return RestPeriod.day;
  }
}

export function getCandlestickPeriod(resolution: string): CandlestickPeriod {
  switch (resolution) {
    case '1':
      return CandlestickPeriod.min1;
    case '5':
      return CandlestickPeriod.min5;
    case '10':
      return CandlestickPeriod.min10;
    case '15':
      return CandlestickPeriod.min15;
    case '30':
      return CandlestickPeriod.min30;
    case '60':
      return CandlestickPeriod.hour;
    case '120':
      return CandlestickPeriod.hour2;
    case '240':
      return CandlestickPeriod.hour4;
    case 'D':
      return CandlestickPeriod.day;
    case '1D':
      return CandlestickPeriod.day;
  }
}
