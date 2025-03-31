import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const method = req.method;
  const { slug } = await params;
  const res = await authApi(`/api/milestone/${slug}`, { method });

  return routeResponse(req, res);
}
