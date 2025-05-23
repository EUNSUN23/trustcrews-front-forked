import { HTTP_METHOD } from 'next/dist/server/web/http';
import response from '@/lib/clientApi/response';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import NEXT_PUBLIC_URL from '@/constants/api/nextPublicUrl';

const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

export const request = async (
  method: HTTP_METHOD,
  url: string,
  data?: Record<string, unknown>,
) => {
  const requestInit: RequestInit = {
    headers,
    method,
  };
  if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

  const res = await fetch(`${NEXT_PUBLIC_URL}${url}`, requestInit);
  return await response(res);
};
