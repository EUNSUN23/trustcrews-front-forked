export function JSONReplaceBigInt(data: Record<string, unknown>) {
  return JSON.stringify(data, (k, v) =>
    typeof v === 'bigint' ? Number(v) : v,
  );
}

// todo - 제거
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
