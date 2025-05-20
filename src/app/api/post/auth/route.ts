import { NextRequest } from 'next/server';
import authFetch from '@/utils/interceptor/auth/authFetch';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const res = await authFetch('/api/post', {
    method: 'POST',
    body: JSONReplaceBigInt(data),
  });

  return routeResponse(req, res);
}
