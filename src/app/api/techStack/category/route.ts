import { NextRequest } from 'next/server';
import publicApi from '@/app/api/_interceptor/publicApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const res = await publicApi('/api/techStackCategory');

  return routeResponse(req, res);
}
