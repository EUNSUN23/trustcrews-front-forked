import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 알림 "크루" 목록 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const method = req.method;
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const reqUrl = `/api/projectAlert/crew?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`;
  const res = await authApi(reqUrl, { method });

  return routeResponse(req, res);
}
