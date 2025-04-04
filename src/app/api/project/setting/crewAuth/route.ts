import { NextRequest } from 'next/server';
import { JSONReplaceBigInt } from '@/utils/common';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import authApi from '@/app/api/_interceptor/authApi';

/**
 * 프로젝트 설정 - 크루 권한 업데이트
 * @param req
 * @constructor
 */
export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authApi('/api/project/setting/crewAuth', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
