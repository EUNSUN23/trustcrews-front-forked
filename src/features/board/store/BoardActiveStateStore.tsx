import { atom } from 'recoil';

export const BOARD_TABS = {
  MY_PROJECTS: { text: '참여 프로젝트', name: 'MY_PROJECTS' },
  PROJECT_POSTS: { text: '팀 프로젝트', name: 'PROJECT_POSTS' },
} as const;

type activeBoardTabState = keyof typeof BOARD_TABS;

export const activeBoardTabStore = atom<activeBoardTabState>({
  key: 'activeTabStateStore',
  default: BOARD_TABS.PROJECT_POSTS.name,
});
