// 프로젝트 지원상태
export const PROJECT_APPLY_STATUS = {
  CHECKING: { code: 'PAS1001', name: '확인중' },
  PERMITTED: { code: 'PAS1002', name: '수락' },
  REJECTED: { code: 'PAS1003', name: '거절' },
} as const;

export const defaultPositionSelectItem = { name: '포지션', value: '0' };
