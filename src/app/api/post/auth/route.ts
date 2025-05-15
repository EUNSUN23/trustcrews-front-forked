import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const res = await authApi('/api/post', {
    method: 'POST',
    body: JSONReplaceBigInt(data),
  });

  return routeResponse(req, res);
}
