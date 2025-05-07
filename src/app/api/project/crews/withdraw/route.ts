import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

/**
 * 프로젝트 탈퇴
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const method = req.method;
  const reqData = await req.json();

  const res = await authApi(`/api/projectmember/withdraw`, {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
