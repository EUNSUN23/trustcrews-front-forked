export const CREW_STATUS = {
  PARTICIPATING: '참여중',
  WITHDRAWLING: '탈퇴 진행중',
} as const;

/**
 * paging - 페이지별 row
 */
export const ITEM_COUNT = {
  CARDS_SM: 6,
  CARDS: 8,
  LIST_SM: 5,
} as const;

/**
 * paging - 페이지 range
 */
export const PAGE_RANGE = {
  DEFAULT: 5,
} as const;

export const PROCESS_ERR =
  '프로세스 수행중 문제가 발생했습니다. 잠시후 다시 시도해주세요.';
