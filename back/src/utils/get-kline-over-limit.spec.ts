import { getKlineOverLimit } from './get-kline-over-limit';
import { Rest } from '../exchanges/konpn/rest';
import { RestPeriod } from '../exchanges/konpn/types';

describe('getKlineOverLimit', () => {
  const rest = new Rest();
  it('get kline over limit', async () => {
    const res = await getKlineOverLimit({
      rest,
      symbol: 'EURJPY',
      period: RestPeriod.day,
      from: 1555849872,
      to: 1555948800,
      resolutionSecond: 86400,
    });
    console.log(res);
  });

  it('get kline over limit2', async () => {
    const res = await getKlineOverLimit({
      rest,
      symbol: 'EURJPY',
      period: RestPeriod.min1,
      from: 1590162494,
      to: 1590250874,
      resolutionSecond: 60,
    });
    console.log(res);
  });
});
