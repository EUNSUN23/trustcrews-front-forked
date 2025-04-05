import { atom } from 'recoil';

export const PostTabs = {
  myProjects: { label: '참여 프로젝트', name: 'myProjects' },
  recruits: { label: '팀 프로젝트', name: 'recruits' },
} as const;

type PostTabType = (typeof PostTabs)[keyof typeof PostTabs];

export const activeTabState = atom<PostTabType>({
  key: 'activeTabState',
  default: {
    label: '팀 프로젝트',
    name: 'recruits',
  },
});
