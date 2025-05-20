import 'server-only';
import { deleteCookieValue } from '@/utils/cookieUtils';
import { COOKIE } from '@/constants/cookie';

const resetCurrentUserAuth = () => {
  deleteCookieValue(COOKIE.ACS_TOKEN);
  deleteCookieValue(COOKIE.REF_TOKEN);
  deleteCookieValue(COOKIE.USER_ID);
};

export default resetCurrentUserAuth;
