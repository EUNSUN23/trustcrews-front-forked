import { NextRequest } from 'next/server';
import publicApi from '@/app/api/_interceptor/publicApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  let res: Response;

  const { slug } = await params;
  switch (slug) {
    case 'position':
      res = await publicApi('/api/position-list/public');
      break;
    case 'tech-stack':
      res = await publicApi('/api/technology-stack-list/public');
      break;
    case 'tech-stack-category':
      res = await publicApi('/api/technology-stack-category-list/public');
      break;
    case 'tech-stack-with-category':
      res = await publicApi(
        '/api/technology-stack-category-mapping-list/public',
      );
      break;
    case 'crewAuth':
      res = await publicApi('/api/crewAuth/public');
      break;
    default:
      throw Error(`Unknown Api Route: ${req.url}`);
  }

  return routeResponse(req, res);
}
