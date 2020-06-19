import { Observable, ReplaySubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { WebsocketData } from './types';
import { WebsocketInsiderBase } from './websocket-insider-base';
import { WsAction } from '../../types';

interface StreamData {
  uuid: string;
  name: string;
  stream: ReplaySubject<WebsocketData>;
}

export class WebsocketInsider extends WebsocketInsiderBase<WebsocketData> {
  private streamTable: StreamData[] = [];

  constructor() {
    super();
  }

  /**
   * handle message
   *
   * @param message
   */
  handleMessage(message: WebsocketData): void {
    const wsKeys = Object.keys(message);
    if (wsKeys.includes('Msg') && message['Msg'] === 'ping') {
      this.pong();
    } else if (wsKeys.includes('Tick')) {
      const streamData = this.streamTable.find(o => o.name.includes(message.S));
      if (streamData) {
        streamData.stream.next(message);
      }
    }
  }

  /**
   *
   * @param symbol
   * /sub/EURJPY
   */
  subscribe(symbol: string): Observable<WebsocketData> {
    const channel = `/${WsAction.Sub}/${symbol}`;
    this.send(channel);

    return this.fetchOrNewStream(channel);
  }

  /**
   * Unsubscribe channel
   * /unsub/EURJPY
   *
   * @param symbol
   */
  unsubscribe(symbol: string): void {
    // unsubscribe real-time data from exchange
    this.send(`/${WsAction.Unsub}/${symbol}`);
    this.delStream(`/${WsAction.Sub}/${symbol}`);
  }

  onDestroy(): void {
    // remove duplicates
    const uniqueStreamData: StreamData[] = [];
    for (const steamData of this.streamTable) {
      if (uniqueStreamData.length === 0) {
        uniqueStreamData.push(steamData);
      } else {
        const sameData = uniqueStreamData.find(o => o.uuid === steamData.uuid);
        // not has same data
        if (!sameData) {
          uniqueStreamData.push(steamData);
        }
      }
    }
    // complete all unique streams
    for (const steamData of uniqueStreamData) {
      steamData.stream.complete();
    }
    // clear stream table
    this.streamTable = [];
  }

  private fetchOrNewStream<T = WebsocketData>(
    channel: string,
    id?: string,
  ): ReplaySubject<T> {
    let stream;

    // when single channel
    const res = this.streamTable.find(o => o.name === channel);
    if (!res) {
      stream = new ReplaySubject(1);
      this.streamTable.push({
        uuid: id ? id : uuid(),
        name: channel,
        stream,
      });
    } else {
      stream = res.stream;
    }

    return stream;
  }

  private delStream(streamName: string): void {
    const streamData = this.streamTable.find((data, index) => {
      if (data.name === streamName) {
        // delete stream data
        this.streamTable.splice(index, 1);

        return true;
      }

      return false;
    });
    if (streamData) {
      // find other data from same uuid
      const otherSteam = this.streamTable.find(o => o.uuid === streamData.uuid);
      // not found
      if (!otherSteam) {
        // complete stream
        streamData.stream.complete();
      }
    }
  }

  private pong(): void {
    this.send('/heartbeat/ok');
  }
}
