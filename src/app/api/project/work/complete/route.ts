import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

/**
 * 프로젝트 업무 완료 요청
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authApi('/api/project/work/complete', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
