import { NextRequest } from 'next/server';
import publicFetch from '@/utils/interceptor/public/publicFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const res = await publicFetch('/api/pmAuth');

  return routeResponse(req, res);
}
