import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authApi('/api/projectConfig/pmAuth', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
