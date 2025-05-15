import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function POST(req: NextRequest) {
  const method = req.method;
  const reqData = await req.json();

  const res = await authApi(`/api/project/auth/leave`, {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
