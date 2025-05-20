import 'server-only';
import { cookies } from 'next/headers';
import { COOKIE } from '@/constants/cookie';

export const isAuthorized = () => {
  const cookieStore = cookies();
  return cookieStore.has(COOKIE.ACS_TOKEN) && cookieStore.has(COOKIE.REF_TOKEN);
};
