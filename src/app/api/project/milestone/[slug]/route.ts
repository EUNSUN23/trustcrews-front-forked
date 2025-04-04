import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const method = req.method;
  const res = await authApi(`/api/milestone/${params.slug}`, { method });

  return routeResponse(req, res);
}
