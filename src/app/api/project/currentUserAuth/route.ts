import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 현재 사용자의 프로젝트 멤버 권한 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const method = req.method;
  const res = await authApi(`/api/project/${projectId}/currentUserAuth`, {
    method,
  });

  return routeResponse(req, res);
}
