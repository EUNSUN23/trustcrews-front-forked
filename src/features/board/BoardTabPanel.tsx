'use client';

import ProjectPosts from '@/features/board/projectPosts';
import { useRecoilValue } from 'recoil';
import {
  activeBoardTabStore,
  BOARD_TABS,
} from '@/features/board/store/BoardActiveStateStore';
import { MyProjects } from '@/features/board/myProjects';

const {
  MY_PROJECTS: { name: MY_PROJECTS },
  PROJECT_POSTS: { name: PROJECT_POSTS },
} = BOARD_TABS;

function BoardTabPanel() {
  const activeBoardTab = useRecoilValue(activeBoardTabStore);

  return (
    <section>
      <div
        role='tabpanel'
        id={`panel-${MY_PROJECTS}`}
        tabIndex={0}
        aria-labelledby={`tab-${MY_PROJECTS}`}
      >
        {activeBoardTab === MY_PROJECTS && <MyProjects />}
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
