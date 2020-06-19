import { Observable, ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as WebSocket from 'ws';
import { ungzip } from '../utils';

/**
 * RxJs wrapper for websocket
 */
export class WebSocketRxJs<T = any> {
  private readonly webSocket: WebSocket;
  private readonly data$ = new ReplaySubject<T>(1);
  private readonly opened$ = new ReplaySubject<boolean>(1);

  /**
   * message stream
   */
  get message$(): Observable<T> {
    return this.data$.asObservable();
  }

  get connected$(): Observable<boolean> {
    return this.opened$.asObservable();
  }

  constructor(url: string) {
    this.webSocket = new WebSocket(url);
    this.webSocket.onopen = () => {
      this.opened$.next(true);
    };
    this.webSocket.onclose = () => {
      this.opened$.next(false);
    };
    this.webSocket.onerror = () => {
      this.opened$.next(false);
    };
    this.webSocket.onmessage = async (e: any) => {
      try {
        const dataStr = await ungzip(e.data);
        this.data$.next(JSON.parse(dataStr));
      } catch (error) {
        this.data$.next(e);
      }
    };
  }

  /**
   * @param text
   */
  send(text: string): void {
    // wait until socket open and send the text only once per call
    this.opened$
      .pipe(
        take(1),
        filter(opened => opened),
      )
      .subscribe(() => {
        this.webSocket.send(text);
      });
  }

  close(): void {
    this.webSocket.close();
    this.data$.complete();
  }
}
