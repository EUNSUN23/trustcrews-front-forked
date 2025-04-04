import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/utils/common';

/**
 * 프로젝트 “투표” 타입 알림 목록 조회  - “강제탈퇴”
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const reqUrl = `/api/projectAlert/vote/fwithdraw?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`;
  const method = req.method;
  const res = await authApi(reqUrl, { method });

  return routeResponse(req, res);
}

/**
 * 프로젝트 강제탈퇴 알림/투표 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authApi('/api/projectAlert/vote/fwithdraw/create', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
