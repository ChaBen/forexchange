import { DatafeedService } from './datafeed.service';
import { StoreService } from '../store/store.service';
jest.setTimeout(1000 * 60 * 60);
describe('DatafeedService', () => {
  let storeService: StoreService;
  let datafeedService: DatafeedService;

  beforeAll(async () => {
    storeService = new StoreService();
    await storeService.onModuleInit();
    datafeedService = new DatafeedService(storeService);
  });
  afterAll(async () => {
    await storeService.onModuleDestroy();
  });

  it('getBars for 5min', async () => {
    const res = await datafeedService.getBars({
      symbol: 'EURJPY',
      resolution: '5',
      from: 1588182743,
      to: 1588614804,
    });
    expect(res.length).toEqual(865);
  });

  it('getBars', async () => {
    const res = await datafeedService.getBars({
      symbol: 'EURJPY',
      resolution: 'D',
      from: 1555849872,
      to: 1590237132,
    });
    expect(res.length).toEqual(7271);
  });

  it('getBars2', async () => {
    const res = await datafeedService.getBars({
      symbol: 'EURJPY',
      resolution: '1',
      from: 1590162494,
      to: 1590250874,
    });
    expect(res.length).toEqual(7271);
  });
});
