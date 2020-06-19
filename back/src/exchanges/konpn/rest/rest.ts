import { ErrorResponse, KlineResponse, TickResponse } from '../types';
import { Kline } from './internal/public/kline';
import { RestKlineRequest } from './types';
import { Observable } from 'rxjs';
import { Tick } from './internal/public/tick';

export class Rest {
  protected readonly kline: Kline;
  protected readonly tick: Tick;

  constructor() {
    this.kline = new Kline();
    this.tick = new Tick();
  }

  fetchKline(
    request: RestKlineRequest,
  ): Observable<KlineResponse[] | ErrorResponse> {
    return this.kline.fetch(request);
  }

  fetchTick(symbol: string): Observable<TickResponse | ErrorResponse> {
    return this.tick.fetch(symbol);
  }
}
