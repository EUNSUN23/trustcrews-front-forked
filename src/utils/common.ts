import {
  MilestoneInfo,
  PositionItem,
  ProjectInfoSummary,
  SelectItem,
  TechStackItem,
} from './type';
import { camelCase } from 'lodash';
import { ReactNode } from 'react';
import { AlertMenuCode, AlertMenuName } from '@/service/project/alert/type';

export const BADGE_COLOR = {
  red: 'bg-red-50 text-red-700 ring-red-600/10',
  yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  green: 'bg-green-50 text-green-700 ring-green-600/20',
  blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  purple: 'bg-purple-50 text-purple-700 ring-purple-700/10',
  slate: 'bg-slate-50 text-slate-600 ring-slate-700/20',
  fullRed: 'bg-[#FF513A] text-[#FFFFFF]',
  fullYellow: 'text-[#FFFFFF] text[#7B5C03]',
} as const;

export type BadgeColor = keyof typeof BADGE_COLOR;
export type BadgeColorValue = (typeof BADGE_COLOR)[BadgeColor];

export const BADGE_SIZE = {
  xs: 'text-[11px] mobile:text-[9px] px-2 mobile:px-1 py-0.5 mobile:py-0',
  sm: 'tablet:text-sm mobile:text-xs px-2 py-1',
  md: 'tablet:text-lg mobile:text-base tablet:px-8 mobile:px-4 tablet:py-4 mobile:py-2',
  lg: 'text-lg px-8 py-4',
} as const;

export type BadgeSize = keyof typeof BADGE_SIZE;
export type BadgeSizeValue = (typeof BADGE_SIZE)[BadgeSize];

export interface BadgeInterface {
  color?(): BadgeColorValue;
  size(): BadgeSizeValue;
}

export class NoticeBadge implements BadgeInterface {
  private readonly _color: BadgeColor;
  private readonly _size: BadgeSize;
  private _text: string;

  constructor(color: BadgeColor, size: BadgeSize, text: string) {
    this._color = color;
    this._size = size;
    this._text = text;
  }

  color(): BadgeColorValue {
    return BADGE_COLOR[this._color];
  }

  size(): BadgeSizeValue {
    return BADGE_SIZE[this._size];
  }

  text(): string {
    return this._text;
  }
}

export class _NoticeBadge extends NoticeBadge {
  constructor(color: BadgeColor, text: AlertMenuName) {
    super(color, 'sm', text);
  }
}

export const NOTICE_BADGE: Record<AlertMenuCode, _NoticeBadge> = {
  PRA2001: new _NoticeBadge('blue', '크루'),
  PRA1002: new _NoticeBadge('yellow', '모집'),
  PRA1003: new _NoticeBadge('red', '강제탈퇴'),
} as const;

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

/**
 * startDate 기준 데이터 배열 정렬
 * @param dataList
 * @param sortBy desc : 내림차순(늦은날짜 -> 빠른날짜), asc : 오름차순(빠른날짜 -> 늦은날짜)
 */
export function sortByStartDate<T extends ProjectInfoSummary | MilestoneInfo>(
  dataList: T[],
  sortBy: 'asc' | 'desc',
): T[] {
  const sorted = dataList.sort(function (a, b) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return sortBy === 'desc' ? sorted.reverse() : sorted;
}

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
