import { EntityRepository, Repository } from 'typeorm';
import { chunk } from 'lodash';

import { VirtualOrderEntity } from './virtual-order.entity';

export interface VirtualOrderEntityCreateParams {
  symbol: VirtualOrderEntity['symbol'];
  time: VirtualOrderEntity['time'];
  side: VirtualOrderEntity['side'];
  adjust: VirtualOrderEntity['adjust'];
  price: VirtualOrderEntity['price'];
  adjustedPrice: VirtualOrderEntity['adjustedPrice'];
}

export interface VirtualOrderEntityParams
  extends VirtualOrderEntityCreateParams {
  id: VirtualOrderEntity['id'];
}

export interface VirtualCandlestick {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  startAt: number;
  lastTime: number;
}

@EntityRepository(VirtualOrderEntity)
export class VirtualOrderRepository extends Repository<VirtualOrderEntity> {
  async insertNewVirtualOrder(
    params: VirtualOrderEntityCreateParams,
  ): Promise<VirtualOrderEntity> {
    return this.save(params as VirtualOrderEntity, { reload: false });
  }

  async insertNewVirtualOrders(
    params: VirtualOrderEntityCreateParams[],
  ): Promise<VirtualOrderEntity[]> {
    return this.save(params as VirtualOrderEntity[], { reload: false });
  }

  async getUnProcessedVirtualOrders(
    symbol: string,
  ): Promise<VirtualOrderEntity[]> {
    return this.find({ where: { symbol, isProcessed: false } });
  }

  async getVirtualCandlesticks(input: {
    symbol: string;
    from?: number;
    to?: number;
  }): Promise<VirtualCandlestick[]> {
    return this.query(`
      Select 
        t1.symbol, t1.high, t1.low, t1.open, t2.adjusted_price as close, t1.startAt, t2.time as lastTime 
      From (
        Select symbol,
        (
          Select
            adjusted_price
          From
            virtual_order
          Where
            symbol = vo.symbol
            And time = vo.time
          Order By
            time, id
            LIMIT 1
        ) open,
        MAX(adjusted_price) as high,
        MIN(adjusted_price) as low,
        Max(id) as lastId,
        UNIX_TIMESTAMP(FROM_UNIXTIME(time/1000, '%Y-%m-%d %H:%i:00')) as startAt
      
        From virtual_order vo
        Where id < 1000000000
        Group By symbol, startAt
      ) t1
      Inner Join virtual_order as t2 On t1.lastId = t2.id
      Where t1.symbol = '${input.symbol}'
      ${input.from !== undefined ? 'And t1.startAt >= ' + input.from : ''}
      ${input.to !== undefined ? 'And t1.startAt <= ' + input.to : ''}
    `);
  }

  async updateMany(params: Partial<VirtualOrderEntityParams>[]): Promise<void> {
    if (params.length < 1) {
      return;
    }
    const bulkUpdateSize = 50;

    await Promise.all(
      chunk(params, bulkUpdateSize).map(ps => {
        let updateSQL = '';
        for (const param of ps) {
          const sql = `
            update virtual_order
            set
              time = ${param.time},
              side = '${param.side}',
              adjust = '${param.adjust}',
              price = '${param.price}',
              adjusted_price = '${param.adjustedPrice}'
            where
              id = '${param.id}';
          `;
          updateSQL = `${updateSQL}${sql}`;
        }

        return this.query(updateSQL);
      }),
    );
  }
}
