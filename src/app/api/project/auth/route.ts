import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const method = req.method;

  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');
  const res = await authApi(
    `/api/project?pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method },
  );
  return routeResponse(req, res);
}
