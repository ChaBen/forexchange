import { connectionUrl } from '../../types';
import { WebSocketRxJs } from '../../../common/websocket';

/**
 * Abstract class for websocket api
 *
 * @param T: ws send request type
 * @param U: raw ws response type
 */
export abstract class WebsocketInsiderBase<T> {
  private ws: WebSocketRxJs<MessageEvent> | null = null;

  abstract handleMessage(response: T): void;
  abstract onDestroy(): void;

  send(request: string): void {
    if (!this.ws) {
      this.init();
    }

    if (this.ws) {
      this.ws.send(request);
    }
  }

  destroy(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.onDestroy();
  }

  private init(): void {
    this.ws = new WebSocketRxJs(connectionUrl);

    this.ws.connected$.subscribe(connected => connected && this.setFields());
    this.ws.message$.subscribe(response => {
      try {
        const data = JSON.parse(response.data);
        this.handleMessage(data);
      } catch (e) {
        console.error(`handleMessage exception occurred`, e);
      }
    });
  }

  /**
   设置订阅返回数据字段
   S　品种
   O　开盘价
   H　高
   L　低
   P　当前价
   V　成交量
   Tick　时间戳
   M1,M5,M10,M15,M30,H1,H2,H4
   */
  private setFields(): void {
    this.ws.send('/fields/S,O,H,L,P,V,Tick,M1,M5,M10,M15,M30,H1,H2,H4');
  }
}
