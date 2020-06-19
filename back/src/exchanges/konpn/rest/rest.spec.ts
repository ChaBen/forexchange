import { RestPeriod } from '../types';
import { Rest } from './rest';
import { formatDate } from '../../../utils';

describe('Rest', () => {
  const pair = 'EURJPY';
  const rest = new Rest();

  it('fetch kline', done => {
    rest
      .fetchKline({
        symbol: pair,
        period: RestPeriod.day,
        datest: '2019-05-01 12:00:00',
        dateed: '2019-05-02 12:00:00',
      })
      .subscribe(res => {
        expect(res).toBeDefined();
        done();
      });
  });

  it('fetch kline2', done => {
    rest
      .fetchKline({
        symbol: pair,
        period: RestPeriod.min1,
        datest: formatDate(1590165301),
        dateed: formatDate(1590167583),
      })
      .subscribe(res => {
        expect(res).toBeDefined();
        done();
      });
  });

  it('fetch kline for BTC', done => {
    rest
      .fetchKline({
        symbol: 'BTC',
        period: RestPeriod.min1,
        datest: '2020-06-03 02:22:00',
        dateed: '2020-06-03 10:41:00',
      })
      .subscribe(res => {
        expect(res).toBeDefined();
        done();
      });
  });

  it('fetch kline for BTC/USD', done => {
    rest
      .fetchKline({
        symbol: 'BTC/USD',
        period: RestPeriod.min1,
        datest: '2020-06-03 02:22:00',
        dateed: '2020-06-03 10:41:00',
      })
      .subscribe(res => {
        expect(res).toBeDefined();
        done();
      });
  });

  it('fetch tick', done => {
    rest.fetchTick(pair).subscribe(res => {
      expect(res).toBeDefined();
      done();
    });
  });
});
