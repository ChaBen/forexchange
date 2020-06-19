import { gzip as zgzip } from 'zlib';
import { promisify } from 'util';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

const gzipAsync = promisify(zgzip) as (data: string) => Promise<Buffer>;

export function gzipRx(obj: Record<string, any>): Observable<Buffer> {
  return fromPromise(gzipAsync(JSON.stringify(obj)));
}
