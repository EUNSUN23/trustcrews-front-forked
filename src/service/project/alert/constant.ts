export const VoteStatus = {
  VSTAT1001: { code: 'VSTAT1001', name: '투표중' },
  VSTAT1002: { code: 'VSTAT1002', name: '투표종료' },
} as const;

export const AlertType = {
  PRA1001: { code: 'PRA1001', name: '투표', parent: null },
  PRA1002: { code: 'PRA1002', name: '모집', parent: 'PRA1001' },
  PRA1003: { code: 'PRA1003', name: '강제탈퇴', parent: 'PRA1001' },
  PRA2001: { code: 'PRA2001', name: '크루', parent: null },
  PRA3001: { code: 'PRA3001', name: '업무', parent: null },
} as const;

export const FWReason = {
  FWR1001: { code: 'FWR1001', name: '맡은 작업 수행에 비협조적인 태도' },
  FWR1002: { code: 'FWR1002', name: '팀원을 모욕하거나 불쾌감을 주는 언행' },
  FWR1003: { code: 'FWR1003', name: '프로젝트 지원시 기술스택을 허위로 기재' },
  FWR1004: { code: 'FWR1004', name: '협업에 필요한 신뢰감을 깨는 기타 행동' },
} as const;
