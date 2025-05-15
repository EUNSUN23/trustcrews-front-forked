import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = req.method;

  const alertId = searchParams.get('alertId');
  const applyId = searchParams.get('applyId');
  const voteId = searchParams.get('voteId');

  const reqUrl = `/api/projectNotice/rcVote?alertId=${alertId}&applyId=${applyId}&voteId=${voteId}`;
  const res = await authApi(reqUrl, { method });

  return routeResponse(req, res);
}
