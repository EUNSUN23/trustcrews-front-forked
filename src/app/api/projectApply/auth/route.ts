import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const res = await authApi(
    `/api/projectApply?pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method: 'GET' },
  );

  return routeResponse(req, res);
}

export async function POST(req: NextRequest) {
  const method = req.method;
  const requestData = await req.json();

  const res = await authApi(`/api/projectApply`, {
    method,
    body: JSON.stringify(requestData),
  });

  return routeResponse(req, res);
}
