import publicFetch from '@/utils/interceptor/public/publicFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const res = await publicFetch(
    `/api/user/public/checkNickname/${searchParams.get('nickname')}`,
  );

  return routeResponse(req, res);
}
