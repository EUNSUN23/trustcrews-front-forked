import { NextRequest } from 'next/server';
import authFetch from '@/utils/interceptor/auth/authFetch';
import { routeResponse } from '@/utils/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const res = await authFetch('/api/user/profile', {
    method: 'GET',
  });

  return routeResponse(req, res);
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();

  const res = await authFetch(`/api/user/profile`, {
    method: 'PUT',
    body: formData,
  });

  return routeResponse(req, res);
}
