import { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { Observable, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RestResponse } from '../types';
import { getAxiosObservableRequest, getRestResponse } from './function';
import { RestPublicEndpoints } from '../types/endpoint';
import { config } from '../../../../common';
import * as Debug from 'debug';
const debug = Debug('API');

export class RestInsider {
  constructor(private readonly endpoint: RestPublicEndpoints) {}

  protected request<T>(
    method: 'GET' | 'POST',
    data: any,
  ): Observable<RestResponse<T>> {
    return this.requestWithEndpoint(this.endpoint, method, data);
  }

  protected requestWithEndpoint<T>(
    endpoint: RestPublicEndpoints,
    method: 'GET' | 'POST',
    data: any,
  ): Observable<RestResponse<T>> {
    try {
      const request: AxiosRequestConfig = {
        method,
        headers: {
          Authorization: `APPCODE ${config.rest.token}`,
        },
      };
      let query = '';
      if (method !== 'GET') {
        request.data = data;
      } else {
        query = Object.keys(data).length !== 0 ? `?${stringify(data)}` : '';
      }
      const url = `${config.rest.url}/${endpoint}${query}`;
      debug(`requestWithEndpoint url: ${url}`);

      return getAxiosObservableRequest<T>(url, request).pipe(
        filter(o => !!o),
        map(getRestResponse),
      );
    } catch (error) {
      console.log(`catch: ${error}`);

      return throwError(error);
    }
  }
}
