import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/utils/common';

/**
 * 프로젝트 세팅 - 프로젝트 게시글 정보 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const method = req.method;
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const res = await authApi(`/api/project/setting/board/${projectId}`, {
    method,
  });
  return routeResponse(req, res);
}

/**
 * 프로젝트 설정 - 프로젝트 게시글정보 수정
 * @param req
 * @constructor
 */
export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authApi('/api/project/setting/board', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
