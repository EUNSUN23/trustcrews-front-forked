import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { searchParams } = new URL(req.url);

  let res: Response;

  switch (params.slug) {
    case 'simple': {
      res = await authApi('/api/user/simple-me');
      break;
    }
    case 'history': {
      const pageNumber = searchParams.get('pageNumber');
      const userId = searchParams.get('userId');
      res = await authApi(
        `/api/user/project-history?userId=${userId}&pageNumber=${pageNumber}`,
      );
      break;
    }
    case 'history-me':
      res = await authApi(
        `/api/user/me/project-history?pageNumber=${searchParams.get('pageNumber')}`,
      );
      break;
    case 'trust-grade':
      res = await authApi('/api/trust-grade/me');
      break;
    case 'general':
      res = await authApi(`/api/user/${searchParams.get('userId')}`);
      break;
    default:
      throw new Error('Unknown User API');
  }

  return routeResponse(req, res);
}
