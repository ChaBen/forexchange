import { gunzip, gzip as zgzip } from 'zlib';
import { promisify } from 'util';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

const gunzipAsync = promisify(gunzip);
const gzipAsync = promisify(zgzip) as any;

/**
 *
 * @param milliseconds
 */
export async function sleep(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve: Function) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function ungzip(
  buf: string | ArrayBuffer | NodeJS.ArrayBufferView,
): Promise<string | undefined> {
  const data = await gunzipAsync(buf);

  if (data) {
    return data.toString();
  }
}

export async function gzip(text: string): Promise<Buffer> {
  return gzipAsync(text);
}

export const useFirstValue = <T>(observable: Observable<T>): Promise<T> => {
  return observable.pipe(take(1)).toPromise();
};
