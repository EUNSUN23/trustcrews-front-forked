'use client';

import ProjectPosts from '@/features/board/projectPosts';
import { useRecoilValue } from 'recoil';
import {
  activeTabState,
  PostTabs,
} from '@/features/board/store/BoardActiveStateStore';
import { MyProjects } from '@/features/board/myProjects';

const {
  myProjects: { name: MY_PROJECTS },
  recruits: { name: PROJECT_POSTS },
} = PostTabs;

function BoardTabPanel() {
  const { name: activeTabName } = useRecoilValue(activeTabState);

  return (
    <section>
      <div
        role='tabpanel'
        tabIndex={0}
        aria-labelledby={`${MY_PROJECTS}-tab`}
        id={`${MY_PROJECTS}-panel`}
      >
        {activeTabName === MY_PROJECTS && <MyProjects />}
      </div>
      <div
        id={`${PROJECT_POSTS}-panel`}
        role='tabpanel'
        tabIndex={0}
        aria-labelledby={`${PROJECT_POSTS}-tab`}
      >
        {activeTabName === PROJECT_POSTS && <ProjectPosts />}
      </div>
    </section>
  );
}

export default BoardTabPanel;
