import { gzipRx } from './gzip-rx';
import { sleep } from '../exchanges/konpn/common';

describe('gzipRx', () => {
  it('gzip rx', async () => {
    const data = {
      id: 'sub_btcusdt_kline_5',
      status: 'ok',
      subbed: 'market.btcusdt.kline.5min',
      ts: 1588489723635,
    };
    gzipRx(data).subscribe(o => {
      console.log(o);
    });

    await sleep(50000);
  });
});
