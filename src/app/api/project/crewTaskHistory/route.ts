import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

// todo - api, route 주석제거
/**
 * 프로젝트 크루 업무 이력 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectMemberId = searchParams.get('projectMemberId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const res = await authApi(
    `api/projectmember/${projectMemberId}/works?pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method: req.method },
  );

  return routeResponse(req, res);
}
