import 'server-only';
import { COOKIE, ssrHasCookie } from '@/app/api/_interceptor/utils/cookieUtils';

const getIsAuthorized = () => {
  return ssrHasCookie(COOKIE.ACS_TOKEN) && ssrHasCookie(COOKIE.REF_TOKEN);
};

export default getIsAuthorized;
