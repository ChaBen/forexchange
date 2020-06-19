import { gzip, ungzip } from './utils';

describe('utils', () => {
  const testJson = [
    'message',
    {
      time: 1588868700,
      open: 9507.18,
      high: 9526.8,
      low: 9507.14,
      close: 9521.77,
      volume: 52.63837222295509,
    },
  ];

  it('gzip', async () => {
    const res = await gzip(JSON.stringify(testJson));
    console.log(res);
  });

  it('ungzip', async () => {
    const gzipTxt = await gzip(JSON.stringify(testJson));
    const res = await ungzip(gzipTxt);
    console.log(res);
  });
});
