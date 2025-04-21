import { PositionItem, SelectItem, TechStackItem } from './type';
import { camelCase } from 'lodash';
import { ReactNode } from 'react';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function getSelectItemValue<T extends ReactNode, V extends ReactNode>(
  item: SelectItem<T, V>,
) {
  return item.value;
}

export function getPositionSelectItem(item: PositionItem | null) {
  if (item) {
    return { value: item.positionId, name: item.positionName };
  }

  return item;
}

export function getPositionSelectItems(items: PositionItem[]) {
  if (items.length > 0) {
    return items.map(({ positionId, positionName }) => ({
      value: bigIntToString(positionId),
      name: positionName,
    }));
  }

  return [];
}

export function getTechStackSelectItems(
  items: TechStackItem[],
): SelectItem<string, string>[] {
  if (items.length > 0) {
    return items.map(({ techStackId, techStackName }) => ({
      value: bigIntToString(techStackId),
      name: techStackName,
    }));
  }

  return [];
}

export function JSONReplaceBigInt(data: Record<string, unknown>) {
  return JSON.stringify(data, (k, v) =>
    typeof v === 'bigint' ? Number(v) : v,
  );
}

export const isValidEmail = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidNickname = (nickname: string) => {
  const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
  return nicknameRegex.test(nickname);
};

export const isValidPassword = (password: string) => {
  const passwordRegex: RegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,12}$/;
  return passwordRegex.test(password);
};

export function getRandomBigInt() {
  // Calculate the range (inclusive)
  const range =
    BigInt(Number.MAX_SAFE_INTEGER * 2) - BigInt(Number.MAX_SAFE_INTEGER);

  // Calculate the number of bytes needed to represent the range
  const byteLength = Math.ceil(Math.log2(Number(range)) / 8);

  // Create a buffer to store random bytes
  const buffer = new Uint8Array(byteLength);

  // Generate random bytes
  crypto.getRandomValues(buffer);

  // Convert the buffer to a BigInt
  let randomBigInt = 0n;
  for (let i = 0; i < byteLength; i++) {
    randomBigInt <<= 8n;
    randomBigInt |= BigInt(buffer[i]);
  }

  // Adjust the value to fit within the specified range
  randomBigInt = (randomBigInt % range) + BigInt(1);

  return randomBigInt;
}

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
 * 프로젝트 업무 만료여부 검사
 * @param endDate
 */
export function checkExpiration(endDate: string) {
  return new Date(endDate).getTime() < new Date().getTime();
}

/**
 * bigint 데이터 string으로 변환
 * @param data
 */
export function bigIntToString(data: bigint | string) {
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
