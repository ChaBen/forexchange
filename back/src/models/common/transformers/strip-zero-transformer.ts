import { stripZero } from '../../../common/big-number-util';

export const stripZeroTransformer = {
  // argument can be undefined when typeorm uses internally.
  from: (v: any) => (typeof v === 'string' ? stripZero(v) : v),
  to: (v: any) => (typeof v === 'string' ? stripZero(v) : v),
};
