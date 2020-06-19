import { KlineResponse, Period } from '../types';
import { WebsocketInsider } from './internal/websocket-insider';
import { Kline } from './internal/public/kline';
import { Observable } from 'rxjs';

export class Websocket {
  private readonly ws: WebsocketInsider;
  private readonly kline: Kline;

  constructor() {
    this.ws = new WebsocketInsider();
    this.kline = new Kline(this.ws);
  }

  lastKline$(pair: string, period: Period): Observable<KlineResponse> {
    return this.kline.lastKline$(pair, period);
  }

  stopLastKline(pair: string): void {
    this.kline.stopLastKline(pair);
  }

  destroy(): void {
    this.ws.destroy();
  }
}
