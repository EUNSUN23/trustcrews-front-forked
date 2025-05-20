import { NextRequest } from 'next/server';
import authFetch from '@/utils/interceptor/auth/authFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const method = req.method;
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');
  const res = await authFetch(`/api/projectCrew/list/${projectId}`, { method });

  return routeResponse(req, res);
}
