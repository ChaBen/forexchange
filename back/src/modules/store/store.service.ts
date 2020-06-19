import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Rest } from '../../exchanges/konpn/rest';
import { KlineResponse, TickResponse } from '../../exchanges/konpn/types';
import { GetBarsInput, OrderInputSide, SymbolInfo } from '../../types';
import { getCandlestickPeriod } from '../datafeed/internal';
import { createConnection, EntityManager } from 'typeorm';
import { CandlestickRepository } from '../../models/entity/candlestick';
import { SymbolInfoRepository } from '../../models/entity/symbol-info';
import { UserRepository } from '../../models/entity/user';
import {
  VirtualCandlestick,
  VirtualOrderRepository,
} from '../../models/entity/virtual-order';

@Injectable()
export class StoreService implements OnModuleInit, OnModuleDestroy {
  private manager!: EntityManager;
  private candlestickRepo: CandlestickRepository;
  private virtualOrderRepo: VirtualOrderRepository;
  private readonly rest: Rest;

  constructor() {
    this.rest = new Rest();
  }

  async onModuleInit(): Promise<void> {
    const connection = await createConnection();
    this.manager = connection.manager;
    this.candlestickRepo = new CandlestickRepository(this.manager);
    this.virtualOrderRepo = this.manager.getCustomRepository(
      VirtualOrderRepository,
    );
  }

  onModuleDestroy() {
    this.manager.connection.close();
  }

  async saveVirtualOrder(input: {
    symbol: string;
    side: OrderInputSide;
    adjust: number;
    price: number;
    adjustedPrice: number;
  }): Promise<void> {
    await this.virtualOrderRepo.insertNewVirtualOrder({
      symbol: input.symbol,
      time: Date.now(),
      side: input.side,
      price: input.price,
      adjust: input.adjust,
      adjustedPrice: input.adjustedPrice,
    });
  }

  async getVirtualCandlesticks(input: {
    symbol: string;
    from?: number;
    to?: number;
  }): Promise<VirtualCandlestick[]> {
    return this.virtualOrderRepo.getVirtualCandlesticks(input);
  }

  async getKline(input: GetBarsInput): Promise<KlineResponse[]> {
    const period = getCandlestickPeriod(input.resolution);
    return this.candlestickRepo.getCandlesticks({
      period,
      ...input,
    });
  }

  async saveKline(
    symbol: string,
    resolution: string,
    data: KlineResponse[],
  ): Promise<void> {
    const period = getCandlestickPeriod(resolution);
    await this.candlestickRepo.insertNewCandlesticks({
      period,
      symbol,
      data,
    });
  }

  async saveSymbolInfo(tick: TickResponse): Promise<SymbolInfo | undefined> {
    if (tick.symbol) {
      const symbolInfo = {
        symbol: tick.symbol,
        description: tick.name,
        pricePrecision: getPrecision(tick.price),
        volumePrecision: getPrecision(tick.volume),
      };
      const repo = this.manager.getCustomRepository(SymbolInfoRepository);
      await repo.insertNewSymbolInfo(symbolInfo);

      return symbolInfo;
    }
  }

  async getSymbolInfo(symbol: string): Promise<SymbolInfo | undefined> {
    const repo = this.manager.getCustomRepository(SymbolInfoRepository);
    return repo.getSymbolInfo(symbol);
  }

  async verifyToken(token: string): Promise<boolean> {
    const repo = this.manager.getCustomRepository(UserRepository);
    const res = await repo.getUser(token);

    return !!res;
  }
}

function getPrecision(val: string | number): number {
  const res = `${+val}`.split('.');

  return res.length !== 2 ? 0 : res[1].length;
}
