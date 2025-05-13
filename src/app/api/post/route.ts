import authApi from '@/app/api/_interceptor/authApi';
import publicApi from '@/app/api/_interceptor/publicApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

// todo - 라우트 public, private 구분
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  const res = await publicApi(`/api/post/${postId}/public`);

  return routeResponse(req, res);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const res = await authApi('/api/post', {
    method: 'POST',
    body: JSONReplaceBigInt(data),
  });

  return routeResponse(req, res);
}
