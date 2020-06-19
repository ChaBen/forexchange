import { EntityRepository, Repository } from 'typeorm';

import { SymbolInfoEntity } from './symbol-info.entity';

export interface SymbolInfoEntityCreateParams {
  symbol: SymbolInfoEntity['symbol'];
  description: SymbolInfoEntity['description'];
  pricePrecision: SymbolInfoEntity['pricePrecision'];
  volumePrecision: SymbolInfoEntity['volumePrecision'];
}

@EntityRepository(SymbolInfoEntity)
export class SymbolInfoRepository extends Repository<SymbolInfoEntity> {
  async insertNewSymbolInfo(
    params: SymbolInfoEntityCreateParams,
  ): Promise<SymbolInfoEntity> {
    return this.save(params as SymbolInfoEntity, { reload: false });
  }

  async insertNewSymbolInfos(
    params: SymbolInfoEntityCreateParams[],
  ): Promise<SymbolInfoEntity[]> {
    return this.save(params as SymbolInfoEntity[], { reload: false });
  }

  async getSymbolInfo(symbol: string): Promise<SymbolInfoEntity | undefined> {
    return this.findOne({ where: { symbol } });
  }
}
