import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { RestInsider } from './rest-insider';
import { RestPublicEndpoints } from '../types/endpoint';

describe('RestInsider', () => {
  let restInsider: RestInsider;

  beforeAll(() => {
    restInsider = new RestInsider(RestPublicEndpoints.Tick);
  });

  it('should request tick', async () => {
    const res = await ((restInsider as any).request('GET', {
      symbol: 'EURJPY',
    }) as Observable<AxiosResponse<any>>).toPromise();
    expect(res).toBeDefined();
  });

  it('should request kline', async () => {
    const restInsider2 = new RestInsider(RestPublicEndpoints.Kline);
    const res = await ((restInsider2 as any).request('GET', {
      symbol: 'EURJPY',
      period: 'D',
      datest: '2019-05-01 12:00:00',
      dateed: '2019-05-02 12:00:00',
    }) as Observable<AxiosResponse<any>>).toPromise();
    expect(res).toBeDefined();
  });

  it('should request kline2', async () => {
    const restInsider2 = new RestInsider(RestPublicEndpoints.Kline);
    const res = await ((restInsider2 as any).request('GET', {
      symbol: 'EURJPY',
      period: '1M',
      datest: '2020-05-23 04:59:00',
      dateed: '2020-05-23 13:18:00',
    }) as Observable<AxiosResponse<any>>).toPromise();
    expect(res).toBeDefined();
  });
});
