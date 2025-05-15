import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const pageNumber = searchParams.get('pageNumber');
  const userId = searchParams.get('userId');

  const res = await authApi(
    `/api/projectHistory?userId=${userId}&pageNumber=${pageNumber}`,
  );

  return routeResponse(req, res);
}
