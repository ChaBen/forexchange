import { Observable } from 'rxjs';

import { ErrorResponse, TickResponse } from '../../../../types';
import { TickRaw } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { map } from 'rxjs/operators';
import { RestPublicEndpoints } from '../../../types/endpoint';

export class Tick extends RestInsider {
  constructor() {
    super(RestPublicEndpoints.Tick);
  }

  fetch(symbol: string): Observable<TickResponse | ErrorResponse> {
    return this.request<TickRaw>('GET', { symbol }).pipe(
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
