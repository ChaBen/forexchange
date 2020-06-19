import { Observable } from 'rxjs';

import { ErrorResponse, KlineResponse } from '../../../../types';
import { KlineRaw, RestKlineRequest, RestResponse } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { map } from 'rxjs/operators';
import { RestPublicEndpoints } from '../../../types/endpoint';

export class Kline extends RestInsider {
  constructor() {
    super(RestPublicEndpoints.Kline);
  }

  fetch(
    request: RestKlineRequest,
  ): Observable<KlineResponse[] | ErrorResponse> {
    return this.request<KlineRaw[]>('GET', request).pipe(
      map(o => {
        if (o.Code < 0) {
          return { errorMsg: o.Msg } as ErrorResponse;
        }

        return (o as RestResponse<KlineRaw[]>).Obj.map(raw => ({
          time: raw.Tick,
          volume: raw.V,
          open: raw.O,
          close: raw.C,
          high: raw.H,
          low: raw.L,
        }));
      }),
    );
  }
}
