/**
 * 프로젝트 상세 > 메뉴
 */
export const PROJECT_MENU = {
  TASK: {
    name: '업무',
    value: 'TASK',
    url: '/project/task',
  },
  CREWS: {
    name: '크루',
    value: 'CREWS',
    url: '/project/crews',
  },
  NOTICE: {
    name: '알림',
    value: 'NOTICE',
    url: '/project/notice',
  },
  SETTING: {
    name: '프로젝트 설정',
    value: 'SETTING',
    url: '/project/setting',
  },
} as const;

export const PROJECT_HISTORY_STATUS = {
  FORCED_WDL: 'FORCED_WITHDRAWAL',
  WDL: 'WITHDRAWAL',
  PAR: 'PARTICIPATING',
  FIN: 'FINISH',
} as const;
