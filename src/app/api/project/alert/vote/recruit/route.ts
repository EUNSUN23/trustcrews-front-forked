import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 “투표” 타입 알림 목록 조회 - “모집”
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const method = req.method;
  const res = await authApi(
    `/api/projectAlert/vote/recruit?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method },
  );

  return routeResponse(req, res);
}
