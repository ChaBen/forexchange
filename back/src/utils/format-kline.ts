import { KlineResponse } from '../exchanges/konpn/types';
import { hour8ToUtc } from './format-date';

/**
 * TODO 废弃
 * 将rest返回的北京时区时间戳改为UTC时间戳
 * @param klines
 */
export function formatKline(klines: KlineResponse[]): KlineResponse[] {
  return klines.map(k => ({ ...k, time: hour8ToUtc(k.time) }));
}
