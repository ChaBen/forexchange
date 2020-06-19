import { formatDate, hour8ToUtc } from './format-date';

describe('formatDate', () => {
  it('format date', async () => {
    // "2020-05-22 15:49:00" utc
    const res = formatDate(1590162540);
    expect(res).toEqual('2020-05-22 23:49:00');
    // 2020-05-23 00:08:00 utc
    const res2 = formatDate(1590192480);
    expect(res2).toEqual('2020-05-23 08:08:00');
  });

  it('hour8ToUtc', async () => {
    // "2020-05-22 15:49:00" utc
    const res = hour8ToUtc(1590162540);
    expect(res).toEqual(1590162060);
  });
});
