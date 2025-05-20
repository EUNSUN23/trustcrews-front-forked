import 'server-only';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';
import { commonRequestHeaders } from '@/utils/serverApi/request';
import { getCookieValue } from '@/utils/cookieUtils';
import { COOKIE } from '@/constants/cookie';
import { createErrorResponse } from '@/utils/interceptor/createErrorResponse';
import { HttpError } from '@/utils/error/HttpError';
import { HttpStatusCode } from 'axios';
import resetCurrentUserAuth from '@/utils/serverApi/resetCurrentUserAuth';
import revalidatingUsers from '@/utils/interceptor/auth/revalidatingUsers';
import pendingRequest from '@/utils/interceptor/auth/pendingRequest';

export const authFetchWrapper = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async (
    url: string | URL,
    requestInit?: RequestInit,
  ): Promise<Response> => {
    const userId = getCookieValue(COOKIE.USER_ID);
    if (!revalidatingUsers.has(userId)) {
      if (requestInit) requestInit.headers = commonRequestHeaders(requestInit);

      try {
        return await fetch(url, { ...requestInit });
      } catch (e) {
        if (
          e instanceof HttpError &&
          e.status === HttpStatusCode.Unauthorized
        ) {
          resetCurrentUserAuth();
        }

        return createErrorResponse(e);
      }
    } else {
      return new Promise((resolve) => {
        pendingRequest.add(userId, async (error: Error | null) => {
          let response: Response;

          if (error) {
            if (
              error instanceof HttpError &&
              error.status === HttpStatusCode.Unauthorized
            ) {
              resetCurrentUserAuth();
            }
            response = await createErrorResponse(error);
          } else {
            if (requestInit)
              requestInit.headers = commonRequestHeaders(requestInit);

            try {
              response = await fetch(url, { ...requestInit });
            } catch (fetchError) {
              response = await createErrorResponse(fetchError);
            }
          }
          resolve(response);
        });
      });
    }
  };
};
