'use client';

import ProjectPosts from '@/features/board/projectPosts';
import { useRecoilValue } from 'recoil';
import {
  activeBoardTabStore,
  BOARD_TABS,
} from '@/features/board/store/BoardActiveStateStore';
import { MyProjectApply } from '@/features/projectApply/auth/components/MyProjectApply';
import MyProjects from '@/features/board/myProjects';

const {
  MANAGE_PROJECT: { name: MANAGE_PROJECT },
  PROJECT_POSTS: { name: PROJECT_POSTS },
} = BOARD_TABS;

function BoardTabPanel() {
  const activeBoardTab = useRecoilValue(activeBoardTabStore);

  return (
    <section>
      <div
        role='tabpanel'
        id={`panel-${MANAGE_PROJECT}`}
        tabIndex={0}
        aria-labelledby={`tab-${MANAGE_PROJECT}`}
      >
        {activeBoardTab === MANAGE_PROJECT && <MyProjectApply />}
        {activeBoardTab === MANAGE_PROJECT && <MyProjects />}
      </div>
      <div
        role='tabpanel'
        id={`panel-${PROJECT_POSTS}`}
        tabIndex={0}
        aria-labelledby={`tab-${PROJECT_POSTS}`}
      >
        {activeBoardTab === PROJECT_POSTS && <ProjectPosts />}
      </div>
    </section>
  );
}

export default BoardTabPanel;
