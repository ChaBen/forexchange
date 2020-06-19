import { EntityTestBed } from '../../common/testing/entity-test-bed';
import {
  SymbolInfoEntityCreateParams,
  SymbolInfoRepository,
} from './symbol-info.repository';
import { getSymbolInfoDefaultData } from '../../common/testing/data/models';
import { SymbolInfoEntity } from './symbol-info.entity';

describe('symbolInfo.repository', () => {
  let symbolInfoRepository: SymbolInfoRepository;
  const defaultData = getSymbolInfoDefaultData();
  const symbol = 'xbtusd';

  beforeAll(async () => {
    await EntityTestBed.setup();
    symbolInfoRepository = EntityTestBed.getRepository(SymbolInfoRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await symbolInfoRepository.insertNewSymbolInfos(defaultData);
  });

  describe('insertNewSymbolInfo', () => {
    it('should insert new symbolInfo', async () => {
      await symbolInfoRepository.insertNewSymbolInfo(defaultData[0]);
      const insertedSymbolInfo = await symbolInfoRepository.find();
      expect(insertedSymbolInfo.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('insertNewSymbolInfos', () => {
    it('should insert new SymbolInfos', async () => {
      const insertedSymbolInfos = await symbolInfoRepository.find();
      expect(insertedSymbolInfos.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getSymbolInfos', () => {
    it('should get symbolInfos', async () => {
      const res = await symbolInfoRepository.getSymbolInfo(symbol);
      expect([getDataFromEntity(res)]).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(
  entity: SymbolInfoEntity,
): SymbolInfoEntityCreateParams {
  return {
    symbol: entity.symbol,
    description: entity.description,
    pricePrecision: entity.pricePrecision,
    volumePrecision: entity.volumePrecision,
  };
}
