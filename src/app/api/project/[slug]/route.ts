import authApi from '@/app/api/_interceptor/authApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 내 프로젝트 목록/상세 조회
 * @constructor
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const method = req.method;

  const { slug } = await params;
  if (slug === 'list') {
    const { searchParams } = new URL(req.url);
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');
    const res = await authApi(
      `/api/project/me/participating?pageIndex=${pageIndex}&itemCount=${itemCount}`,
      { method },
    );
    return routeResponse(req, res);
  } else if (slug === 'detail') {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const userId = searchParams.get('userId');
    const res = await authApi(`/api/project/${projectId}/${userId}`, {
      method,
    });
    return routeResponse(req, res);
  } else {
    throw Error(`Unknown Api Route : ${req.url}`);
  }
}
