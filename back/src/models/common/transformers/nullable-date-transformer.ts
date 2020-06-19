import { Timestamp } from '../../../types';

export const nullableDateTransformer = {
  from: (value: Date | null | undefined | number | string) => {
    // must return undefined or null.
    // typeorm uses undefined internally.
    if (value === undefined || value === null) {
      return value;
    }

    if (value instanceof Date) {
      return value.getTime() as Timestamp;
    }

    return new Date(value).getTime() as Timestamp;
  },
  to: (value?: number | null | undefined) => {
    if (value === undefined || value === null) {
      return value;
    }

    return new Date(value);
  },
};
