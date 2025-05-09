import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

/**
 * 프로젝트 (특정 마일스톤 내) 업무 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const milestoneId = searchParams.get('milestoneId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const res = await authApi(
    `/api/project/work?projectId=${projectId}&milestoneId=${milestoneId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method: 'GET' },
  );

  return routeResponse(req, res);
}

/**
 * 프로젝트 (특정 마일스톤 내) 업무 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const res = await authApi(`/api/project/work`, {
    method: 'POST',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}

/**
 * 업무 수정
 * @param req
 * @constructor
 */
export async function PATCH(req: NextRequest) {
  const reqData = await req.json();

  const res = await authApi(`/api/project/work`, {
    method: 'PATCH',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}

/**
 * 업무 삭제
 * @param req
 * @constructor
 */
export async function DELETE(req: NextRequest) {
  const reqData = await req.json();

  const res = await authApi(`/api/project/work`, {
    method: 'DELETE',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
