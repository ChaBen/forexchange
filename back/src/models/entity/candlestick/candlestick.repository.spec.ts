import { CandlestickEntity, CandlestickMin5Entity } from './candlestick.entity';
import {
  CandlestickEntityCreateParams,
  CandlestickRepository,
  Period,
} from './candlestick.repository';
import { EntityManager, createConnection } from 'typeorm';
import { getCandlestickDefaultData } from '../../common/testing/data';

describe('candlestick.repository', () => {
  let manager: EntityManager;
  let candlestickRepository: CandlestickRepository;
  const defaultData = getCandlestickDefaultData();
  const symbol = 'xbtusd';

  beforeAll(async () => {
    const connection = await createConnection();
    manager = connection.manager;
    manager.clear(CandlestickMin5Entity);
    candlestickRepository = new CandlestickRepository(manager);
  });

  describe('insertNewCandlesticks', () => {
    it('should insert new Candlesticks', async () => {
      await candlestickRepository.insertNewCandlesticks({
        symbol,
        period: Period.min5,
        data: defaultData,
      });
      const insertedCandlesticks = await manager.find(CandlestickMin5Entity);
      expect(insertedCandlesticks.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getCandlesticks', () => {
    it('should get candlesticks', async () => {
      await candlestickRepository.insertNewCandlesticks({
        symbol,
        period: Period.min5,
        data: defaultData,
      });
      const res = await candlestickRepository.getCandlesticks({
        symbol,
        period: Period.min5,
        from: 0,
        to: Date.now(),
      });
      expect([getDataFromEntity(res[0])]).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(
  entity: CandlestickEntity,
): Partial<CandlestickEntityCreateParams> {
  return {
    time: entity.time,
    open: entity.open,
    high: entity.high,
    low: entity.low,
    close: entity.close,
    volume: entity.volume,
  };
}
