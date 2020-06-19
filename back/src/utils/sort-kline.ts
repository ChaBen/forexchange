import { KlineResponse } from '../exchanges/konpn/types';

function compare(a: KlineResponse, b: KlineResponse): number {
  if (a.time < b.time) {
    return -1;
  }

  if (a.time > b.time) {
    return 1;
  }

  return 0;
}

export function sortKline(klineList: KlineResponse[]): KlineResponse[] {
  if (!klineList || klineList.length === 0) {
    return [];
  }
  removeDuplicates(klineList, thingsEqual);

  return klineList.sort(compare);
}

function removeDuplicates(arr, equals): void {
  const originalArr = arr.slice(0);
  let i, len, val;
  arr.length = 0;

  for (i = 0, len = originalArr.length; i < len; ++i) {
    val = originalArr[i];
    if (
      !arr.some(function(item) {
        return equals(item, val);
      })
    ) {
      arr.push(val);
    }
  }
}

function thingsEqual(kline1: KlineResponse, kline2: KlineResponse): boolean {
  return kline1.time === kline2.time;
}
