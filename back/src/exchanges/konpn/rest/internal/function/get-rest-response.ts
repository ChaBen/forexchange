import { AxiosResponse } from 'axios';

import { RestResponse } from '../../types';

export function getRestResponse<T>(source: AxiosResponse<T>): RestResponse<T> {
  return source.data as any;
}
