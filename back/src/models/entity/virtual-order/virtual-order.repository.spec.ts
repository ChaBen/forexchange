import { getVirtualOrderDefaultData } from '../../common/testing/data';
import { EntityTestBed } from '../../common/testing/entity-test-bed';
import {
  VirtualOrderEntityCreateParams,
  VirtualOrderRepository,
} from './virtual-order.repository';
import { VirtualOrderEntity } from './virtual-order.entity';

describe('virtual-order.repository', () => {
  let virtualOrderRepository: VirtualOrderRepository;
  const defaultData = getVirtualOrderDefaultData();
  const symbol = 'xbtusd';

  beforeAll(async () => {
    await EntityTestBed.setup();
    virtualOrderRepository = EntityTestBed.getRepository(
      VirtualOrderRepository,
    );
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await virtualOrderRepository.insertNewVirtualOrders(defaultData);
  });

  describe('insertNewVirtualOrder', () => {
    it('should insert new VirtualOrder', async () => {
      await EntityTestBed.reset();
      const newData = {
        ...defaultData[0],
        time: Date.now(),
      };
      await virtualOrderRepository.insertNewVirtualOrder(newData);
      const insertedVirtualOrder = await virtualOrderRepository.find();
      expect(insertedVirtualOrder.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('insertNewVirtualOrders', () => {
    it('should insert new VirtualOrders', async () => {
      const insertedVirtualOrders = await virtualOrderRepository.find();
      expect(insertedVirtualOrders.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getUnProcessedVirtualOrders', () => {
    it('should get unProcessedVirtualOrders', async () => {
      const res = await virtualOrderRepository.getUnProcessedVirtualOrders(
        symbol,
      );
      expect([getDataFromEntity(res[0])]).toEqual(defaultData);
    });
  });

  describe('getVirtualCandlesticks', () => {
    it('should get virtualCandlesticks', async () => {
      const res = await virtualOrderRepository.getVirtualCandlesticks({
        symbol,
        from: 0,
        to: 999999999999,
      });
      expect(res).toBeDefined();
    });
  });

  describe('updateMany', () => {
    it('should update many', async () => {
      const vOrders = await virtualOrderRepository.getUnProcessedVirtualOrders(
        symbol,
      );
      await virtualOrderRepository.updateMany([
        {
          ...vOrders[0],
          time: 0,
        },
      ]);
      const res = await virtualOrderRepository.getUnProcessedVirtualOrders(
        symbol,
      );
      expect([getDataFromEntity(res[0])]).toEqual([
        {
          ...defaultData[0],
          time: 0,
        },
      ]);
    });
  });
});

function getDataFromEntity(
  entity: VirtualOrderEntity,
): VirtualOrderEntityCreateParams {
  return {
    symbol: entity.symbol,
    time: entity.time,
    price: entity.price,
    side: entity.side,
    adjust: entity.adjust,
    adjustedPrice: entity.adjustedPrice,
  };
}
