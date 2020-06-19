import { Kline } from './kline';
import { RestPeriod } from '../../../../types';

describe('Rest Kline', () => {
  const kline = new Kline();

  it('fetch kline for min1', async () => {
    const len = 0;
    const res = await kline
      .fetch({
        symbol: 'EURJPY',
        period: RestPeriod.min1,
        datest: '2020-04-30 02:53:00',
        dateed: '2020-04-30 11:12:00',
      })
      .toPromise();
    expect((res as any).length).toEqual(len);
  });

  it('fetch kline for day', async () => {
    const len = 1;
    const res = await kline
      .fetch({
        symbol: 'EURJPY',
        period: RestPeriod.day,
        datest: '2019-05-01 12:00:00',
        dateed: '2019-05-02 12:00:00',
      })
      .toPromise();
    expect((res as any).length).toEqual(len);
  });
});
