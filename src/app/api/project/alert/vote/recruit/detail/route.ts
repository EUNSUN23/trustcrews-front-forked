import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 투표 알림 상세 조회 - “모집”
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = req.method;

  const alertId = searchParams.get('alertId');
  const applyId = searchParams.get('applyId');
  const voteId = searchParams.get('voteId');

  const reqUrl = `/api/projectAlert/vote/recruit/detail?alertId=${alertId}&applyId=${applyId}&voteId=${voteId}`;
  const res = await authApi(reqUrl, { method });

  return routeResponse(req, res);
}
