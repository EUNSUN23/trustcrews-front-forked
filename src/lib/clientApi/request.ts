import { HTTP_METHOD } from 'next/dist/server/web/http';
import { JSONReplaceBigInt } from '@/utils/common';
import { handleResponse } from '@/lib/clientApi/handleResponse';
import { headers, publicURL } from '@/service/request';

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
