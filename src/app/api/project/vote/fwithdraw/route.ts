import { NextRequest } from 'next/server';
import { JSONReplaceBigInt } from '@/utils/common';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 '강제탈퇴' 투표
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const method = req.method;
  const reqData = await req.json();

  const res = await authApi('/api/projectVote/fwithdraw', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
