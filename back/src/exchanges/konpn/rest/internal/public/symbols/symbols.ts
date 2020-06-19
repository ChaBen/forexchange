import { Observable } from 'rxjs';

import { ErrorResponse, TickResponse } from '../../../../types';
import { TickRaw } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { map } from 'rxjs/operators';
import { RestPublicEndpoints } from '../../../types/endpoint';

export class Symbols extends RestInsider {
  constructor() {
    super(RestPublicEndpoints.Symbols);
  }

  // TODO http://map.konpn.com:10002/localrm/query/symbols?keywords=EUR&pidx=1&rout=GBFSB
  fetch(keywords: string): Observable<TickResponse | ErrorResponse> {
    return this.request<TickRaw>('GET', { keywords, p: 50 }).pipe(
      // TickRaw
      map(raw => {
        if (raw.Code < 0) {
          return { errorMsg: raw.Msg } as ErrorResponse;
        }

        return {
          volume: raw.Obj.V,
          price: raw.Obj.P,
          symbol: raw.Obj.S,
          name: raw.Obj.N,
        };
      }),
    );
  }
}
