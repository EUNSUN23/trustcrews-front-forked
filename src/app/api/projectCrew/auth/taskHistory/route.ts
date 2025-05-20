import { NextRequest } from 'next/server';
import authFetch from '@/utils/interceptor/auth/authFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crewId = searchParams.get('crewId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const res = await authFetch(
    `/api/projectCrew/${crewId}/taskHistory?pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method: req.method },
  );

  return routeResponse(req, res);
}
