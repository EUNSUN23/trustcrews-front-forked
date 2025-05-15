import { NextRequest } from 'next/server';
import authApi from '@/app/api/_interceptor/authApi';
import { routeResponse } from '@/app/api/_interceptor/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const milestoneId = searchParams.get('milestoneId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const res = await authApi(
    `/api/projectJobs/task?projectId=${projectId}&milestoneId=${milestoneId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method: 'GET' },
  );

  return routeResponse(req, res);
}

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const res = await authApi(`/api/projectJobs/task`, {
    method: 'POST',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}

export async function PATCH(req: NextRequest) {
  const reqData = await req.json();

  const res = await authApi(`/api/projectJobs/task`, {
    method: 'PATCH',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}

export async function DELETE(req: NextRequest) {
  const reqData = await req.json();

  const res = await authApi(`/api/projectJobs/task`, {
    method: 'DELETE',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
