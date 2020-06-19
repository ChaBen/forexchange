export function getPrecision(val: string|number): number {
  const res = `${+val}`.split('.');

  return res.length !== 2 ? 0 :res[1].length;
}
