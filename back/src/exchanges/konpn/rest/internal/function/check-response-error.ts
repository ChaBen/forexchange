export function checkResponseError(err: {
  [attr: string]: any;
}): Error | undefined {
  if (err) {
    return err as Error;
  }
}
