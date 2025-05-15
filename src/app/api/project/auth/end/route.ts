import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function POST(req: NextRequest) {
  const { projectId } = await req.json();
  const res = await authApi(`/api/project/${projectId}/end`, {
    method: 'POST',
  });

  return routeResponse(req, res);
}
