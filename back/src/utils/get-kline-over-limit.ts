import { KlineResponse, RestPeriod } from '../exchanges/konpn/types';
import { formatDate } from './format-date';
import { sortKline } from './sort-kline';
import { Rest } from '../exchanges/konpn/rest';
import { Logger } from '@nestjs/common';

export async function getKlineOverLimit(input: {
  rest: Rest;
  symbol: string;
  period: RestPeriod;
  from: number;
  to: number;
  resolutionSecond: number;
}): Promise<KlineResponse[]> {
  const size = Math.floor((input.to - input.from) / input.resolutionSecond);
  const maxSize = 500;
  if (size <= maxSize) {
    // 得到区间值（不包含from和to）
    const data = await input.rest
      .fetchKline({
        symbol: input.symbol,
        period: input.period,
        datest: formatDate(input.from + 1), // TODO + input.resolutionSecond?
        dateed: formatDate(input.to - 1),
      })
      .toPromise();

    if (data && data['errorMsg']) {
      Logger.log(
        `获取k线数据出错: ${data['errorMsg']}, input: ${JSON.stringify(input)}`,
        'fetchKline',
      );
      return [];
    }

    return sortKline(data as KlineResponse[]);
  }

  const loopSize = Math.ceil(size / maxSize);
  const formattedFrom =
    Math.ceil(input.from / input.resolutionSecond) * input.resolutionSecond;
  const formattedTo =
    Math.floor(input.to / input.resolutionSecond) * input.resolutionSecond;

  let klines: KlineResponse[] = [];
  for (let i = 0; i < loopSize; i++) {
    const start = formattedFrom + input.resolutionSecond * maxSize * i;
    const end =
      i + 1 === loopSize
        ? formattedTo
        : formattedFrom + input.resolutionSecond * (maxSize - 1) * (i + 1);
    const data = await input.rest
      .fetchKline({
        symbol: input.symbol,
        period: input.period,
        datest: formatDate(start),
        dateed: formatDate(end),
      })
      .toPromise();
    if (data && data['errorMsg']) {
      Logger.log(
        `获取k线数据出错: ${data['errorMsg']}, input: ${JSON.stringify(input)}`,
        'fetchKline',
      );
    } else if (data && (data as KlineResponse[]).length > 0) {
      klines = [...klines, ...(data as KlineResponse[])];
    }
  }

  return sortKline(klines);
}
