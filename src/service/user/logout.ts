import { request } from '@/lib/clientApi/request';

export const logout = async () => {
  return await request('POST', '/api/user/logout');
};
