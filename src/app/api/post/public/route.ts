import publicApi from '@/app/api/_interceptor/publicApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  const res = await publicApi(`/api/post/public/${postId}`);

  return routeResponse(req, res);
}
