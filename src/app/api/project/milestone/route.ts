import authApi from '@/app/api/_interceptor/authApi';
import { NextRequest } from 'next/server';
import { JSONReplaceBigInt } from '@/utils/common';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 마일스톤 목록 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const res = await authApi(`/api/milestone/project/${projectId}`, {
    method: 'GET',
  });

  return routeResponse(req, res);
}

/**
 * 마일스톤 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const { projectId, content, startDate, endDate, authMap } = await req.json();

  const res = await authApi(`/api/milestone`, {
    method: 'POST',
    body: JSONReplaceBigInt({
      projectId,
      content,
      startDate,
      endDate,
      authMap,
    }),
  });

  return routeResponse(req, res);
}

/**
 * 마일스톤 수정
 * @param req
 * @constructor
 */
export async function PATCH(req: NextRequest) {
  const { content, startDate, endDate, milestoneId, progressStatusCode } =
    await req.json();

  const res = await authApi(`/api/milestone/${milestoneId}`, {
    method: 'PATCH',
    body: JSONReplaceBigInt({
      content,
      startDate,
      endDate,
      progressStatusCode,
    }),
  });

  return routeResponse(req, res);
}

/**
 * 프로젝트 마일스톤 삭제
 * @param request
 * @constructor
 */
export async function DELETE(request: NextRequest) {
  const reqData = await request.json();

  const res = await authApi(`/api/milestone`, {
    method: 'DELETE',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(request, res);
}
