import authApi from '@/app/api/_interceptor/authApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import {
  COOKIE,
  deleteCookieValue,
} from '@/app/api/_interceptor/utils/cookieUtils';

export async function POST(req: NextRequest) {
  const res = await authApi('/api/user/logout', { method: 'POST' });

  if (res.ok) {
    deleteCookieValue(COOKIE.USER_ID);
    deleteCookieValue(COOKIE.ACS_TOKEN);
    deleteCookieValue(COOKIE.REF_TOKEN);
  }

  return routeResponse(req, res);
}
