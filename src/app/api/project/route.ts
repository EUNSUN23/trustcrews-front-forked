import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { JSONReplaceBigInt } from '@/utils/common';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 프로젝트 정보 수정
 * @param req
 * @constructor
 */
export async function PUT(req: NextRequest) {
  const { projectInfo } = await req.json();

  const res = await authApi(`${baseURL}/api/project`, {
    method: 'PUT',
    body: JSONReplaceBigInt(projectInfo),
  });

  return routeResponse(req, res);
}

/**
 * 프로젝트 종료
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const { projectId } = await req.json();

  const res = await authApi(`${baseURL}/api/project/${projectId}/end`, {
    method: 'POST',
  });

  return routeResponse(req, res);
}
