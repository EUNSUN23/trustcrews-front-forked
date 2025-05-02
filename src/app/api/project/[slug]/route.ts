import authApi from '@/app/api/_interceptor/authApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/utils/common';

/**
 * 내 프로젝트 목록/상세 조회
 * @constructor
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const method = req.method;

  if (params.slug === 'list') {
    const { searchParams } = new URL(req.url);
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');
    const res = await authApi(
      `/api/project/me/participating?pageIndex=${pageIndex}&itemCount=${itemCount}`,
      { method },
    );
    return routeResponse(req, res);
  } else if (params.slug === 'detail') {
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

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (params.slug === 'create') {
    const data = await req.json();

    const res = await authApi(`/api/project`, {
      method: 'POST',
      body: JSONReplaceBigInt(data),
    });

    return routeResponse(req, res);
  } else if (params.slug === 'end') {
    const { projectId } = await req.json();

    const res = await authApi(`/api/project/${projectId}/end`, {
      method: 'POST',
    });

    return routeResponse(req, res);
  } else {
    throw Error(`Unknown Api Route : ${req.url}`);
  }
}
