import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const method = req.method;
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');
  const res = await authApi(`/api/projectCrew/list/${projectId}`, { method });

  return routeResponse(req, res);
}
