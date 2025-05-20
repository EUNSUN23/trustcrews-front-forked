import publicFetch from '@/utils/interceptor/public/publicFetch';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  const res = await publicFetch(`/api/post/public/${postId}`);

  return routeResponse(req, res);
}
