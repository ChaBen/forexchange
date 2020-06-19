import { formatDate } from './format-date';
import { KlineResponse } from '../exchanges/konpn/types';
import { sortKline } from './sort-kline';

describe('sortKline', () => {
  it('sort kline', async () => {
    const kline: KlineResponse = {
      time: 1590165300,
      open: 117.061,
      low: 117.059,
      high: 117.067,
      close: 117.066,
      volume: 47,
    };
    const res = sortKline([kline, { ...kline, time: kline.time - 100 }, kline]);
    console.log(res);
  });
});
