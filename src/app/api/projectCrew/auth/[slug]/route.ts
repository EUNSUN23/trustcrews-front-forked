import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const method = req.method;

  const res = await authFetch(`/api/projectCrew/${params.slug}`, { method });

  return routeResponse(req, res);
}
