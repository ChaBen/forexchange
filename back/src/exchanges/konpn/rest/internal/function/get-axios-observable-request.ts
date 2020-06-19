import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, Observer } from 'rxjs';

import { checkResponseError } from './check-response-error';

/**
 * axios方法转rx
 * @param url
 * @param config
 */
export function getAxiosObservableRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
): Observable<AxiosResponse<T>> {
  return new Observable((observer: Observer<AxiosResponse<T>>) => {
    const cancelToken = Axios.CancelToken.source();
    const cancelTokenConfig = {
      cancelToken: cancelToken.token,
      timeout: 10000,
    };
    Axios(
      url,
      config ? { ...cancelTokenConfig, ...config } : cancelTokenConfig,
    ).then(
      result => {
        observer.next(result);
        observer.complete();
      },
      error => {
        const catchedError = checkResponseError(error);
        console.log(
          `getAxiosObservableRequest catch: ${
            catchedError ? catchedError : error
          }`,
        );
        Axios.isCancel(error)
          ? observer.complete()
          : observer.error(catchedError);
      },
    );
  });
}
