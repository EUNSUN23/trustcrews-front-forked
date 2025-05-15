import publicApi from '@/app/api/_interceptor/publicApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const res = await publicApi(
    `/api/user/public/checkNickname/${searchParams.get('nickname')}`,
  );

  return routeResponse(req, res);
}
