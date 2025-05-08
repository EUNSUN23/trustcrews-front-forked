export type ApiResult<T extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<T>
>;
