import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

const baseURL = process.env.BACKEND_HOST;

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
