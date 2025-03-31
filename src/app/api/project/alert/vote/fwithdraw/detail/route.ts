import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 “투표” 알림 하위 “강제탈퇴” 알림 상세조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const voteId = searchParams.get('voteId');
  const fwMemberId = searchParams.get('fwMemberId');
  const reqUrl = `/api/projectAlert/vote/fwithdraw/detail?voteId=${voteId}&fwMemberId=${fwMemberId}`;
  const method = req.method;

  const res = await authApi(reqUrl, { method });
  return routeResponse(req, res);
}
