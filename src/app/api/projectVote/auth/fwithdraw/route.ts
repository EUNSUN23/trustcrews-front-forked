import { NextRequest } from 'next/server';
import authFetch from '@/utils/interceptor/auth/authFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

export async function POST(req: NextRequest) {
  const method = req.method;
  const reqData = await req.json();

  const res = await authFetch('/api/projectVote/fwithdraw', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
