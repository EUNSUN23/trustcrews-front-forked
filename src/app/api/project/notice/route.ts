import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 알림 상태 미확인 -> 확인으로 변경
 * @param req
 * @constructor
 */
export async function PATCH(req: NextRequest) {
  const { alertId } = await req.json();

  const res = await authApi(`/api/alert/${alertId}/status`, {
    method: 'PATCH',
  });

  return routeResponse(req, res);
}
