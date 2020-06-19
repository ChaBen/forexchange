import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KlineResponse, Period } from '../../../../types';
import { WebsocketData, WebsocketInsider } from '../../websocket-insider';
import { formatKlineTime } from '../../../helpers';

function transform(source: WebsocketData, period: Period): KlineResponse {
  if (period === Period.day) {
    return {
      time: formatKlineTime(source.Tick, period),
      volume: source.V,
      open: source.O,
      close: source.P,
      high: source.H,
      low: source.L,
    };
  } else {
    // ticks,O,H,L,V
    const [tick, open, high, low, volume] = source[period].split(',');
    const close = source.P;
    const time = formatKlineTime(+tick, period);

    return {
      time,
      volume: +volume,
      open: +open,
      close: +close,
      high: +high,
      low: +low,
    };
  }
}

export class Kline {
  constructor(private readonly ws: WebsocketInsider) {}

  /**
   * latest trade
   *
   * @param symbol
   * @param period
   */
  lastKline$(symbol: string, period: Period): Observable<KlineResponse> {
    return this.ws
      .subscribe(symbol)
      .pipe(map(wsData => transform(wsData, period)));
  }

  stopLastKline(symbol: string): void {
    this.ws.unsubscribe(symbol);
  }
}
