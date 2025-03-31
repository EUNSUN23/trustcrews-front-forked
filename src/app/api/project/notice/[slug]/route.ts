import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

/**
 * 프로젝트 알림 목록 조회
 * @param req
 * @constructor
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { searchParams } = new URL(req.url);

  const method = req.method;

  const projectId = searchParams.get('projectId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  let res: Response;
  const requestNoticeUrl = `/api/alert/project/${projectId}`;
  if (params.slug === 'all') {
    res = await authApi(
      `${requestNoticeUrl}?pageIndex=${pageIndex}&itemCount=${itemCount}`,
      { method },
    );
  } else {
    res = await authApi(
      `${requestNoticeUrl}/${params.slug}?pageIndex=${pageIndex}&itemCount=${itemCount}`,
      { method },
    );
  }

  return routeResponse(req, res);
}

/**
 * 프로젝트 알림 생성
 * @param req
 * @param params
 * @constructor
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  let res: Response;
  const method = req.method;

  switch (params.slug) {
    case 'task': {
      const noticeCreateForm = await req.json();
      res = await authApi(`/api/alert`, {
        method,
        body: JSON.stringify(noticeCreateForm),
      });
      break;
    }
    case 'crewOut': {
      const { projectMemberId } = await req.json();
      res = await authApi(`/api/projectmember/${projectMemberId}/withdraw`, {
        method,
      });
      break;
    }
    case 'force-crewOut': {
      const { projectMemberId } = await req.json();
      res = await authApi(
        `/api/projectmember/${projectMemberId}/force-withdrawal`,
        { method },
      );
      break;
    }
    default:
      throw new Error(`Unknown Notice API: /api/project/notice/${params.slug}`);
  }

  return routeResponse(req, res);
}
