import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import publicApi from '@/app/api/_interceptor/publicApi';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = req.method;

  const projectId = searchParams.get('projectId');

  const res = await publicApi(`/api/project/${projectId}/public`, {
    method,
  });
  return routeResponse(req, res);
}
