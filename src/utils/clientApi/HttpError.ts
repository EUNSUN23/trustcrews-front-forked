import {
  FORBIDDEN_MESSAGE,
  REQUEST_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from '@/constants/clientApi/defaultHttpErrorMessage';

const getDefaultHttpErrorMessage = (httpStatus: number) => {
  const httpStatusStr = httpStatus.toString();
  if (httpStatusStr.startsWith('5')) {
    return SERVER_ERROR_MESSAGE;
  } else if (httpStatusStr.startsWith('4')) {
    switch (httpStatusStr) {
      case '401':
        return UNAUTHORIZED_MESSAGE;
      case '403':
        return FORBIDDEN_MESSAGE;
      default:
        return REQUEST_ERROR_MESSAGE;
    }
  } else {
    return '';
  }
};

export class HttpError extends Error {
  status: number;
  statusText?: string;

  constructor(status: number, statusText?: string, errorMessage?: string) {
    super(`${errorMessage || getDefaultHttpErrorMessage(status)}`.trim());
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}
