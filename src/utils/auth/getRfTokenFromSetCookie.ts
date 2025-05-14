import 'server-only';
import { camelCase } from 'lodash';

const getRfTokenFromSetCookie = (setCookieHeader: string) => {
  let refreshTokenValue = '';
  let cookieOptions = {};
  setCookieHeader.split(';').map((item) => {
    const cookieItem = item.trim().split('=');
    if (cookieItem.includes('Refresh')) {
      refreshTokenValue = cookieItem[1];
    } else {
      const optionName = camelCase(cookieItem[0]);
      const optionValue = cookieItem[1] ?? true;
      cookieOptions = {
        ...cookieOptions,
        [optionName]: optionValue,
      };
    }
  });

  return { token: refreshTokenValue, options: cookieOptions };
};

export default getRfTokenFromSetCookie;
