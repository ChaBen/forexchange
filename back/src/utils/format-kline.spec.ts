import { formatDate, hour8ToUtc } from './format-date';
import { formatKline } from './format-kline';

describe('format kline', () => {
  it('formatKline', async () => {
    const klines = [
      {
        time: 1590162540, // "2020-05-22 15:49:00" +8
        volume: 79,
        open: 117.103,
        close: 117.103,
        high: 117.109,
        low: 117.098,
      },
      {
        time: 1590181140, // "2020-05-22 20:59:00" +8
        volume: 0,
        open: 117.305,
        close: 117.305,
        high: 117.305,
        low: 117.305,
      },
    ];
    const res = formatKline(klines);
    expect(res).toEqual([
      {
        time: 1590162060,
        volume: 79,
        open: 117.103,
        close: 117.103,
        high: 117.109,
        low: 117.098,
      },
      {
        time: 1590180660,
        volume: 0,
        open: 117.305,
        close: 117.305,
        high: 117.305,
        low: 117.305,
      },
    ]);
  });
});
