import authApi from '@/app/api/_interceptor/authApi';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';

export async function GET(req: NextRequest) {
  const res = await authApi('/api/user/me', {
    method: 'GET',
  });

  return routeResponse(req, res);
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();

  const res = await authApi(`/api/user`, {
    method: 'PUT',
    body: formData,
  });

  return routeResponse(req, res);
}
