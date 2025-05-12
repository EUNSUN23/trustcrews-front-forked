import { HTTP_METHOD } from 'next/dist/server/web/http';
import handleResponse from '@/utils/clientApi/handleResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import publicURL from '@/constants/api/publicURL';

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

  const res = await fetch(`${publicURL}${url}`, requestInit);
  return await handleResponse(res);
};
