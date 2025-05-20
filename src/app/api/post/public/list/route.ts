import { NextRequest } from 'next/server';
import publicFetch from '@/utils/interceptor/public/publicFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.search;
  const res = await publicFetch(`/api/post/public/list${queryParams}`);

  return routeResponse(req, res);
}
