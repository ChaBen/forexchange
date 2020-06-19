import { OrderInputSide } from '../../../types';
import { add, subtract } from '../../../common/big-number-util';

export function getAdjustPrice(
  price: number,
  adjust: number,
  side: OrderInputSide,
): number {
  const adjuetFn = side === 'up' ? add : subtract;
  return adjuetFn(price, adjust).toNumber();
}
