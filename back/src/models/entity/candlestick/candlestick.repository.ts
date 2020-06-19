import { EntityManager } from 'typeorm';
import { chunk } from 'lodash';

import { CandlestickEntity } from './candlestick.entity';
import { getCandlestickEntity } from './functions';

export interface CandlestickEntityCreateParams {
  symbol: CandlestickEntity['symbol'];
  time: CandlestickEntity['time'];
  open: CandlestickEntity['open'];
  high: CandlestickEntity['high'];
  low: CandlestickEntity['low'];
  close: CandlestickEntity['close'];
  volume: CandlestickEntity['volume'];
}

export enum Period {
  min1 = 'min1',
  min5 = 'min5',
  min10 = 'min10',
  min15 = 'min15',
  min30 = 'min30',
  hour = 'hour',
  hour2 = 'hour2',
  hour4 = 'hour4',
  day = 'day',
}

export interface Kline {
  // 时间戳（秒）
  time: number;
  open: number;
  low: number;
  high: number;
  close: number;
  // 成交量
  volume: number;
}

export class CandlestickRepository {
  constructor(private readonly manager: EntityManager) {}

  async insertNewCandlesticks(input: {
    symbol: string;
    period: Period;
    data: Kline[];
  }): Promise<any> {
    const entity = getCandlestickEntity(input.period);
    if (!entity) {
      console.error(`未知实体对象${entity}`);
      return;
    }

    return this.manager.transaction(async manager => {
      const bulkSize = 50;

      return Promise.all(
        chunk(input.data, bulkSize).map(values => {
          let sql = `
          INSERT INTO ${input.period} (
            symbol,
            time,
            open,
            low,
            high,
            close,
            volume
          ) VALUES `;

          for (const v of values) {
            sql = `${sql} (
            '${input.symbol}',
            '${v.time}',
            '${v.open}',
            '${v.low}',
            '${v.high}',
            '${v.close}',
            '${v.volume}'
          ),`;
          }

          // remove last comma.
          sql = sql.slice(0, -1);
          sql = `${sql} ON DUPLICATE KEY UPDATE
          symbol = VALUES(symbol),
          time = VALUES(time),
          open = VALUES(open),
          low = VALUES(low),
          high = VALUES(high),
          close = VALUES(close),
          volume = VALUES(volume)`;

          return manager.query(sql);
        }),
      );
    });
  }

  async getCandlesticks(input: {
    symbol: string;
    period: Period;
    from: number;
    to: number;
  }): Promise<CandlestickEntity[]> {
    const entity = getCandlestickEntity(input.period);
    if (!entity) {
      console.error(`未知实体对象${entity}`);
      return;
    }
    const queryBuilder = this.manager
      .createQueryBuilder(entity, 'candle')
      .where(
        'candle.time >= :from and candle.time <= :to and symbol = :symbol',
        { from: input.from, to: input.to, symbol: input.symbol },
      );

    return queryBuilder.getMany();
  }
}
