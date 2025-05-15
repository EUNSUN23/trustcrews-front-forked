import { NextRequest } from 'next/server';
import publicApi from '@/app/api/_interceptor/publicApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.search;
  const res = await publicApi(`/api/post/public/list${queryParams}`);

  return routeResponse(req, res);
}
