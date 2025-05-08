export type ResponseResult = 'success' | 'fail';

export type ResponseBody<T> = {
  result: ResponseResult;
  message: string;
  data: T;
};

export type Paged<T> = {
  content: T;
  totalPages: number;
};

export type PageResponseBody<T> = {
  result: ResponseResult;
  message: string;
  data: T extends null ? null : Paged<T>;
};
