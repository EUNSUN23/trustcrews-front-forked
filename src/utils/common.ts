import { camelCase } from 'lodash';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function JSONReplaceBigInt(data: Record<string, unknown>) {
  return JSON.stringify(data, (k, v) =>
    typeof v === 'bigint' ? Number(v) : v,
  );
}

export const isValidNickname = (nickname: string) => {
  const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
  return nicknameRegex.test(nickname);
};

export const sortByStartDate = <T extends Record<'startDate', string>>(
  dataList: T[],
  sortBy: 'asc' | 'desc',
): T[] => {
  const sorted = dataList.sort(function (a, b) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return sortBy === 'desc' ? sorted.reverse() : sorted;
};

export function getRefreshToken(setCookieHeader: string) {
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
}

/**
 * bigint 데이터 string으로 변환
 * @param data
 */
export function bigIntToString(data: bigint | number | string) {
  return typeof data === 'string' ? data : Number(data).toString();
}

/**
 * 숫자문자열 bigint로 변환
 * @param data
 */
export function numStrToBigInt(data: string) {
  return BigInt(data);
}

export function throwErrorIfInvalid(flag: boolean, message: string) {
  if (flag) throw Error(message);
}
