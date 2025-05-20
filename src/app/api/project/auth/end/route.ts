import { NextRequest } from 'next/server';
import authFetch from '@/utils/interceptor/auth/authFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function POST(req: NextRequest) {
  const { projectId } = await req.json();
  const res = await authFetch(`/api/project/${projectId}/end`, {
    method: 'POST',
  });

  return routeResponse(req, res);
}
