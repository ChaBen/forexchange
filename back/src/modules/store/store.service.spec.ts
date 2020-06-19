import { StoreService } from './store.service';

describe('StoreService', () => {
  let storeService: StoreService;

  beforeAll(async () => {
    storeService = new StoreService();
    await storeService.onModuleInit();
  });

  afterAll(() => {
    storeService.onModuleDestroy();
  });

  it('order', async () => {
    await storeService.saveVirtualOrder({
      symbol: 'EURJPY',
      side: 'up',
      adjust: 1.1,
      price: 4000,
      adjustedPrice: 4001.1,
    });
  });

  it('getKline', async () => {
    const res = await storeService.getKline({
      symbol: 'EURJPY',
      resolution: '120',
      from: 1589804920,
      to: 1589904920,
    });
    expect(res.length).toEqual(2000);
  });

  it('getKline #2', async () => {
    const res = await storeService.getKline({
      symbol: 'BTC',
      resolution: '1',
      from: 1591883219,
      to: 1591993900,
    });
    expect(res.length).toEqual(2000);
  });

  it('verifyToken', async () => {
    const res = await storeService.verifyToken('test');
    expect(res).toBeTruthy();
  });
});
