import authFetch from '@/utils/interceptor/auth/authFetch';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/utils/serverApi/routeResponse';
import { deleteCookieValue } from '@/utils/cookieUtils';
import { COOKIE } from '@/constants/cookie';

export async function POST(req: NextRequest) {
  const res = await authFetch('/api/user/logout', { method: 'POST' });

  if (res.ok) {
    deleteCookieValue(COOKIE.USER_ID);
    deleteCookieValue(COOKIE.ACS_TOKEN);
    deleteCookieValue(COOKIE.REF_TOKEN);
  }

  return routeResponse(req, res);
}
