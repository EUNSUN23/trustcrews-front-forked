import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crewId = searchParams.get('crewId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const res = await authApi(
    `/api/projectCrew/${crewId}/taskHistory?pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method: req.method },
  );

  return routeResponse(req, res);
}
