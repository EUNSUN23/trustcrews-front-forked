import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { JSONReplaceBigInt } from '@/utils/common';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 알림 컨펌
 * @param req
 * @param params
 * @constructor
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const reqData = await req.json();

  let res: Response;
  const method = req.method;

  switch (params.slug) {
    case 'work':
      res = await authApi('/api/work/confirm', {
        method,
        body: JSONReplaceBigInt(reqData),
      });
      break;
    case 'recruit':
      res = await authApi(`/api/project/participate/confirm`, {
        method,
        body: JSONReplaceBigInt({
          alertId: reqData.alertId,
          confirmResult: reqData.confirmResult,
        }),
      });
      break;
    case 'withdraw':
      res = await authApi(`/api/projectmember/withdraw/confirm`, {
        method,
        body: JSONReplaceBigInt(reqData),
      });
      break;
    case 'force-withdrawal':
      res = await authApi(
        `/api/projectmember/${JSONReplaceBigInt(reqData.projectId)}/${JSONReplaceBigInt(reqData.targetUserId)}/force-withdrawal/confirm`,
        { method },
      );
      break;
    default:
      throw new Error(
        `Unknown Notice Confirm Api: /api/project/confirm/${params.slug}`,
      );
  }

  return routeResponse(req, res);
}
