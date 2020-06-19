import { Bar, OrderInput } from '../../../types';
import { getAdjustPrice } from './get-adjust-price';

export function getPublishBar(input: OrderInput, bar: Bar): Bar {
  const close = getAdjustPrice(bar.close, input.adjust, input.side);

  return {
    ...bar,
    close,
    high: bar.high < close ? close : bar.high,
    low: bar.low > close ? close : bar.low,
  };
}
