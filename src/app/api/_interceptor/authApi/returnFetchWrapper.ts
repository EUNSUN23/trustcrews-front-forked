import 'server-only';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';
import { isRevalidatingUser } from '@/app/api/_interceptor/authApi/refreshQueue';
import { addToPendingRequest } from '@/app/api/_interceptor/authApi/pendingRequestQueue';
import {
  COOKIE,
  getCookieValue,
} from '@/app/api/_interceptor/utils/cookieUtils';
import {
  createErrorResponse,
  CustomResponse,
} from '@/app/api/_interceptor/response';
import { commonRequestHeaders } from '@/app/api/_interceptor/request';

export const returnFetchWrapper = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async (
    url: string | URL,
    requestInit?: RequestInit,
  ): Promise<CustomResponse> => {
    const userId = getCookieValue(COOKIE.USER_ID);

    if (!isRevalidatingUser(userId)) {
      if (requestInit) requestInit.headers = commonRequestHeaders(requestInit);

      try {
        return await fetch(url, { ...requestInit });
      } catch (e: unknown) {
        return await createErrorResponse(e as Error);
      }
    } else {
      return new Promise((resolve) => {
        addToPendingRequest(userId, async (error: Error | null) => {
          let response: Response;
          if (error) {
            response = await createErrorResponse(error as Error);
          } else {
            if (requestInit)
              requestInit.headers = commonRequestHeaders(requestInit);

            try {
              response = await fetch(url, { ...requestInit });
            } catch (fetchError: unknown) {
              response = await createErrorResponse(fetchError as Error);
            }
          }
          resolve(response);
        });
      });
    }
  };
};
