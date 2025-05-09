import { atom } from 'recoil';
import MAIN_BOARD_TABS from '@/constants/data/mainBoardTabs';

const {
  BM_TAB002: { code: PROJECT_POSTS_TAB },
} = MAIN_BOARD_TABS;

export const activeMainBoardTabStore = atom<string>({
  key: 'activeMainBoardTabStore',
  default: PROJECT_POSTS_TAB,
});
