import { NextRequest } from 'next/server';
import publicApi from '@/app/api/_interceptor/publicApi';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  let res: Response;

  const { slug } = await params;
  if (slug === 'search') {
    const queryParams = req.nextUrl.search;
    res = await publicApi(`/api/board/search/public${queryParams}`);
  } else {
    throw Error('Unknown Api Route');
  }

  return routeResponse(req, res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  let res: Response;
  const { slug } = await params;
  if (slug === 'recruitment-status') {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get('boardId');
    res = await authApi(`/api/board/${boardId}/recruitment-status`, {
      method: req.method,
    });
  } else {
    throw Error('Unknown Api Route');
  }

  return routeResponse(req, res);
}
