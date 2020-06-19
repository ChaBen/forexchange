/**
 * Use this transformer for the following case.
 *   - we want to use a value as `boolean` in application, but store it as `tinyint` into DB.
 */
export const booleanTinyintTransformer = {
  from: (val: 0 | 1): boolean => !!val,
  to: (val: boolean) => {
    if (val === undefined || val === null) {
      return val;
    }
    const n = Number(val);
    if (Number.isNaN(n)) {
      throw new Error(`Invalid boolean value ${val}`);
    }

    return n as 0 | 1;
  },
};
/**
 * Use this when tinyint has a default value i.e. '0' or '1'.
 * @see MasterSpotPairEntity
 */
export const nullableBooleanTinyintTransformer = {
  from: (val: 0 | 1): boolean => !!val,
  to: (val: boolean | null | undefined) => {
    if (val === undefined || val === null) {
      return val;
    }

    return Number(val) as 0 | 1;
  },
};
