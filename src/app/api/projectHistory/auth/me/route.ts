import authFetch from '@/utils/interceptor/auth/authFetch';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const res = await authFetch(
    `/api/projectHistory/me?pageNumber=${searchParams.get('pageNumber')}`,
  );

  return routeResponse(req, res);
}
