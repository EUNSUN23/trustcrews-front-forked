import {atom} from 'recoil';

export const BOARD_TABS = {
  MANAGE_PROJECT: { text: '내 프로젝트 관리', name: 'MANAGE_PROJECT' },
  PROJECT_POSTS: { text: '팀 프로젝트', name: 'PROJECT_POSTS' },
} as const;

type activeBoardTabState = keyof typeof BOARD_TABS;

export const activeBoardTabStore = atom<activeBoardTabState>({
  key: 'activeTabStateStore',
  default: BOARD_TABS.PROJECT_POSTS.name,
});
