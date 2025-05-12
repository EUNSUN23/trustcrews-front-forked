import { ResponseBody } from '@/types/responseBody';

export class HttpError extends Error {
  status: number;
  responseBody: ResponseBody<null>;
  statusText?: string;

  constructor(
    status: number,
    responseBody: ResponseBody<null>,
    statusText?: string,
  ) {
    super(`${status} ${statusText ?? ''}`.trim());
    this.name = 'HttpError';
    this.status = status;
    this.responseBody = responseBody;
    this.statusText = statusText;

    // 👇 스택 트레이스 캡처 (V8 엔진 기반 환경에서만 동작)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}
