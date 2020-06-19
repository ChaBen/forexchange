import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * 将utc时间戳 转换为 北京时间
 * eg: formatDate(1590192480) => '2020-05-23 08:08:00'
 * @param timestamp (秒)
 */
export function formatDate(timestamp: number): string {
  return dayjs(timestamp * 1000)
    .utcOffset(8)
    .format('YYYY-MM-DD HH:mm:ss');
}

/**
 * TODO 废弃
 * 北京时区时间戳 -> UTC时间戳
 * eg: formatDate(1590192480) // 北京时间戳 => 1590192000
 * @param timestamp
 */
export function hour8ToUtc(timestamp: number): number {
  return timestamp - 480;
}
