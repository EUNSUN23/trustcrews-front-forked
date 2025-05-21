import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';
import { createRequestHeaders } from '@/utils/interceptor/createRequestHeaders';
import { createErrorResponse } from '@/utils/interceptor/createErrorResponse';

export const publicFetchWrapper = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async (
    url: string | URL,
    requestInit?: RequestInit,
  ): Promise<Response> => {
    let response: Response;

    if (requestInit) requestInit.headers = createRequestHeaders(requestInit);

    try {
      response = await fetch(url, { ...requestInit, cache: 'no-store' });
    } catch (e) {
      response = await createErrorResponse(e);
    }

    return response;
  };
};
