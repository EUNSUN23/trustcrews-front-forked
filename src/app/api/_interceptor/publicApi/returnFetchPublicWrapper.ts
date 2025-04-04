import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';
import {
  createErrorResponse,
  CustomResponse,
} from '@/app/api/_interceptor/response';
import { commonRequestHeaders } from '@/app/api/_interceptor/request';

export const returnFetchPublicWrapper = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async (
    url: string | URL,
    requestInit?: RequestInit,
  ): Promise<CustomResponse> => {
    let response: Response;

    if (requestInit) requestInit.headers = commonRequestHeaders(requestInit);

    try {
      response = await fetch(url, { ...requestInit, cache: 'no-store' });
    } catch (e: unknown) {
      response = await createErrorResponse(e as Error);
    }

    return response;
  };
};
