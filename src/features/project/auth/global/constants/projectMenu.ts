export const PROJECT_MENU = {
  TASK: {
    name: '업무',
    value: 'TASK',
  },
  CREWS: {
    name: '크루',
    value: 'CREWS',
    child: {
      CREW_DETAIL: {
        name: '크루 상세',
        value: 'CREW_DETAIL',
      },
    },
  },
  NOTICE: {
    name: '알림',
    value: 'NOTICE',
  },
  SETTING: {
    name: '프로젝트 설정',
    value: 'SETTING',
  },
} as const;
