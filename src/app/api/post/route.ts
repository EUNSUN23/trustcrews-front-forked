import authApi from '@/app/api/_interceptor/authApi';
import publicApi from '@/app/api/_interceptor/publicApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

/**
 * 게시글 상세조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  const res = await publicApi(`/api/board/${postId}/public`);

  return routeResponse(req, res);
}

/**
 * 게시글 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const { board, project } = await req.json();

  const res = await authApi('/api/board', {
    method: 'POST',
    body: JSONReplaceBigInt({ board, project }),
  });

  return routeResponse(req, res);
}
