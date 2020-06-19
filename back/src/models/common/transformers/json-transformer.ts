/**
 * JSON parse or stringify
 */
export const jsonTransformer = {
  from: (text: string): any => JSON.parse(text),
  to: (val: any): string => JSON.stringify(val),
};
