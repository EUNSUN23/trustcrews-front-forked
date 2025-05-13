import { NextRequest } from 'next/server';
import publicApi from '@/app/api/_interceptor/publicApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  let res: Response;
  if (params.slug === 'search') {
    const queryParams = req.nextUrl.search;
    res = await publicApi(`/api/post/search/public${queryParams}`);
  } else {
    throw Error('Unknown Api Route');
  }

  return routeResponse(req, res);
}
