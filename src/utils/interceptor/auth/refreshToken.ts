import { cookies } from 'next/headers';
import { reqLogger, resLogger } from '@/utils/interceptor/logger';
import BACKEND_URL from '@/constants/serverApi/backendUrl';
import { getRefreshTokenFromHeader } from '@/utils/interceptor/getRefreshTokenFromHeader';
import { getCookieValue } from '@/utils/cookieUtils';
import { COOKIE } from '@/constants/cookie';
import { getResponseErrorMessage } from '@/utils/interceptor/getResponseErrorMessage';
import { HttpStatusCode } from 'axios';

const refreshTokenApi = async (
  userId: string | undefined,
  refreshToken: string | undefined,
) => {
  if (!userId || !refreshToken) {
    return new Response(
      JSON.stringify({
        result: 'fail',
        data: null,
        message: 'No userId or refresh token in request',
      }),
      { status: HttpStatusCode.BadRequest },
    );
  }

  const REF_TOKEN_REQUEST_URL = `${BACKEND_URL}/api/user/token-reissue`;
  const REF_TOKEN_REQUEST_METHOD = 'POST';

  reqLogger.i(`${REF_TOKEN_REQUEST_METHOD}: ${REF_TOKEN_REQUEST_URL}`); // todo - sentry log 대체

  const response = await fetch(REF_TOKEN_REQUEST_URL, {
    method: REF_TOKEN_REQUEST_METHOD,
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
      Cookie: `Refresh=${refreshToken}`,
    },
    credentials: 'include',
  });

  if (response.ok) {
    resLogger.i(
      `${REF_TOKEN_REQUEST_METHOD} ${response.status}: ${REF_TOKEN_REQUEST_URL}`, // todo - sentry log 대체
    );
  } else {
    const errorMessage = await getResponseErrorMessage(response); // todo - sentry log 대체
    resLogger.i(
      `${REF_TOKEN_REQUEST_METHOD} ${response.status}:  ${REF_TOKEN_REQUEST_URL} - ${errorMessage}`,
    );
  }

  return response;
};

export const refreshToken = async (): Promise<void> => {
  const userId = getCookieValue(COOKIE.USER_ID);
  const refreshToken = getCookieValue(COOKIE.REF_TOKEN);

  const res = await refreshTokenApi(userId, refreshToken);

  if (res.ok) {
    const { headers } = res;
    const accessToken = headers.get('Authorization');
    const setCookieHeader = headers.get('Set-Cookie');

    if (!accessToken || !setCookieHeader) {
      throw new Error(
        'Failed to refresh token: no necessary headers in response',
      );
    }

    const { token, options } = getRefreshTokenFromHeader(setCookieHeader);
    const cookieStore = cookies();
    cookieStore.set(COOKIE.ACS_TOKEN, accessToken, {
      ...options,
      sameSite: 'strict',
    });
    cookieStore.set(COOKIE.REF_TOKEN, token, {
      ...options,
      sameSite: 'strict',
    });
  } else {
    throw new Error('Failed to refresh token: response failed');
  }
};
