import authApi from '@/app/api/_interceptor/authApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const res = await authApi(
    `/api/projectHistory/me?pageNumber=${searchParams.get('pageNumber')}`,
  );

  return routeResponse(req, res);
}
