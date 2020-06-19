import { Injectable, Logger } from '@nestjs/common';
import { Websocket } from '../../exchanges/konpn/websocket';
import {
  getAdjustPrice,
  getPublishBar,
  getResolutionSecond,
  transformResolution,
  transformResolution4Rest,
} from './internal';
import {
  Bar,
  GetBarsInput,
  OrderInput,
  RealtimeInput,
  SymbolInfo,
} from '../../types';
import {
  KlineResponse,
  RestPeriod,
  TickResponse,
} from '../../exchanges/konpn/types';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StoreService } from '../store/store.service';
import { Rest } from '../../exchanges/konpn/rest';
import { getKlineOverLimit, gzipRx } from '../../utils';
import { Server, Socket } from 'socket.io';
import { sortKline } from '../../utils/sort-kline';
import { config } from '../../common';
import { ServiceException } from './exception';

interface SubTableData {
  clients: string[];
  lastBar: Bar;
}

interface SubTable {
  [channel: string]: SubTableData;
}

@Injectable()
export class DatafeedService {
  private readonly ws: Websocket;
  private readonly rest: Rest;
  private subTable: SubTable;

  constructor(private readonly storeService: StoreService) {
    this.ws = new Websocket();
    this.rest = new Rest();
    this.subTable = {};
  }

  order(input: OrderInput, server: Server): void {
    Logger.log(`创建虚拟订单: ${JSON.stringify(input)}`, 'order');
    console.log(input.pwd, config.ws.orderPwd);
    
    if (input.pwd !== config.ws.orderPwd) {
      Logger.warn(`密码错误，取消创建虚拟订单`, 'order');
      throw new ServiceException('Wrong password.');
    }
    const channels = Object.keys(this.subTable).filter(key =>
      key.includes(input.symbol),
    );
    for (const channel of channels) {
      const bar = this.subTable[channel].lastBar;
      const publishBar = getPublishBar(input, bar);
      gzipRx(publishBar)
        .toPromise()
        .then(data => server.to(channel).emit('message', data));
    }
    if (channels.length > 0) {
      const price = this.subTable[channels[0]].lastBar.close;
      const adjustedPrice = getAdjustPrice(price, input.adjust, input.side);

      this.storeService.saveVirtualOrder({
        symbol: input.symbol,
        side: input.side,
        adjust: input.adjust,
        price,
        adjustedPrice,
      });
    }
  }

  subscribe(input: RealtimeInput, client: Socket, server: Server): void {
    const channel = input.symbol + '_' + input.resolution;
    client.join(channel, err => {
      if (err) {
        Logger.error(
          `加入${channel}频道出错：${JSON.stringify(err)}`,
          'subscribe',
        );
        return;
      }
    });
    // 没有创建频道时，创建频道
    if (!Object.keys(this.subTable).includes(channel)) {
      Logger.log(`创建频道: ${channel}, 并添加用户${client.id}`, 'subscribe');
      this.subTable[channel] = {
        clients: [client.id],
        lastBar: {} as any,
      };
      this.kline$(input)
        .pipe(
          switchMap(o => {
            if (!this.subTable[channel] || !this.subTable[channel].lastBar) {
              Logger.log(
                `未找到频道: ${channel}, ${JSON.stringify(this.subTable)}`,
                'subscribe',
              );
              return;
            }
            this.subTable[channel].lastBar = o;

            return gzipRx({ ...o });
          }),
        )
        .subscribe(data => {
          server.to(channel).emit('message', data);
        });
    }
    // 已创建频道，查询是否没有此客户id
    else if (!this.subTable[channel].clients.includes(client.id)) {
      Logger.log(`[${channel}]频道, 加入用户${client.id}`, 'subscribe');
      this.subTable[channel].clients.push(client.id);
    }
  }

  unsubscribe(input: RealtimeInput, client: Socket): void {
    const channel = input.symbol + '_' + input.resolution;
    if (!Object.keys(this.subTable).includes(channel)) {
      Logger.error(`未查询到${channel}频道[unsubscribe]`);
      return;
    }
    client.leave(channel, err => {
      if (err) {
        Logger.error(`退出${channel}频道出错：${JSON.stringify(err)}`);
        return;
      }
    });
    Logger.log(`[${channel}]频道,退出用户${client.id}`, 'unsubscribe');
    this.subTable[channel].clients = this.subTable[channel].clients.filter(
      id => id !== client.id,
    );
    if (this.subTable[channel].clients.length === 0) {
      Logger.log(`[${channel}]频道, 已不存在订阅用户,销毁频道`, 'unsubscribe');
      this.stopKline(input);
      delete this.subTable[channel];
    }
  }

  leaveAll(client: Socket): void {
    const channels = Object.keys(this.subTable);
    for (const channel of channels) {
      Logger.log(`[${channel}]频道, 退出用户${client.id}`, 'leaveAll');
      this.subTable[channel].clients = this.subTable[channel].clients.filter(
        id => id !== client.id,
      );
      if (this.subTable[channel].clients.length === 0) {
        const [symbol, resolution] = channel.split('_');
        Logger.log(`[${channel}]频道, 已不存在订阅用户,销毁频道`, 'leaveAll');
        this.stopKline({ symbol, resolution });
        delete this.subTable[channel];
      }
    }
    this.subTable = {} as any;
  }

  close(): void {
    this.ws.destroy();
  }

  async getSymbolInfo(symbol: string): Promise<SymbolInfo | undefined> {
    Logger.log(`input:${symbol}`, 'getSymbolInfo');

    const symbolInfo = await this.storeService.getSymbolInfo(symbol);
    if (!symbolInfo) {
      const tick = (await this.rest
        .fetchTick(symbol)
        .toPromise()) as TickResponse;
      if (tick.symbol) {
        const savedData = await this.storeService.saveSymbolInfo(tick);
        if (savedData) {
          return savedData;
        }
      }
    }

    return symbolInfo;
  }

  async getBars(input: GetBarsInput): Promise<Bar[]> {
    const period = transformResolution4Rest(input.resolution);
    const resolutionSecond = getResolutionSecond(input.resolution);
    const localKlineList = await this.storeService.getKline(input);
    const foundKlineList = localKlineList.filter(
      o => o.time >= input.from && o.time <= input.to,
    );

    let klines: KlineResponse[];

    if (foundKlineList.length > 0) {
      klines = foundKlineList;
      const firstTime = foundKlineList[0].time;
      const lastTime = foundKlineList[foundKlineList.length - 1].time;
      let firstKlines: KlineResponse[] = [];
      let lastKlines: KlineResponse[] = [];

      // 开始时间间隔大于1个单位
      if (firstTime - input.from > resolutionSecond) {
        // 取得从from 到 firstTime 的k线
        firstKlines = await getKlineOverLimit({
          rest: this.rest,
          symbol: input.symbol,
          period,
          from: input.from,
          to: firstTime,
          resolutionSecond,
        });
        klines = [...firstKlines, ...klines];
      }

      // 结束时间间隔大于1个单位
      if (input.to - lastTime > resolutionSecond) {
        // 取得从lastTime 到 to 的k线
        lastKlines = await getKlineOverLimit({
          rest: this.rest,
          symbol: input.symbol,
          period,
          from: lastTime,
          to: input.to,
          resolutionSecond,
        });
        klines = [...klines, ...lastKlines];
      }
    } else {
      // 缓存数据不在请求范围时，重新请求
      klines = await getKlineOverLimit({
        rest: this.rest,
        symbol: input.symbol,
        period,
        from: input.from,
        to: input.to,
        resolutionSecond,
      });
    }

    if (klines.length > localKlineList.length) {
      await this.storeService.saveKline(input.symbol, input.resolution, klines);
    }
    Logger.log(
      `input:${JSON.stringify(input)}, bar data size: ${klines.length}`,
      'getBars',
    );

    if (period === RestPeriod.min1) {
      const vBars = await this.storeService.getVirtualCandlesticks({
        symbol: input.symbol,
        from: input.from,
        to: input.to,
      });
      const vBarTimes = vBars.map(o => o.startAt);
      const barIndices: number[] = klines.reduce(
        (acc, curr, i) => (vBarTimes.includes(curr.time) ? acc.concat(i) : acc),
        [],
      );

      for (let i = 0; i < barIndices.length; i++) {
        const bar = klines[barIndices[i]];
        const vBar = vBars[i];
        const formattedLastTime = Math.ceil(vBar.lastTime / 1000);
        klines[barIndices[i]] = {
          ...bar,
          low: bar.low > vBar.low ? vBar.low : bar.low,
          high: bar.high < vBar.high ? vBar.high : bar.high,
          close: bar.time + 55 <= formattedLastTime ? vBar.close : bar.close,
        };
      }
    }
    return klines ? sortKline(klines) : [];
  }

  kline$(input: RealtimeInput): Observable<Bar> {
    const period = transformResolution(input.resolution);
    Logger.log(
      `subscribe to realtime data, input:${JSON.stringify(input)}`,
      'kline$',
    );
    return this.ws.lastKline$(input.symbol, period).pipe(filter(o => !!o));
  }

  stopKline(input: RealtimeInput): void {
    Logger.log(
      `unsubscribe to realtime data, input:${JSON.stringify(input)}`,
      'stopKline',
    );
    this.ws.stopLastKline(input.symbol);
  }
}
