import { HTTP_METHOD } from 'next/dist/server/web/http';
import { handleResponse } from '@/utils/clientApi/handleResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

export async function request(
  method: HTTP_METHOD,
  url: string,
  data?: Record<string, unknown>,
) {
  const requestInit: RequestInit = {
    headers,
    method,
  };
  if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

  const res = await fetch(`${publicURL}${url}`, requestInit);
  return await handleResponse(res);
}
