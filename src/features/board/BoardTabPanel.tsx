'use client';

import { useRecoilValue } from 'recoil';
import {
  activeBoardTabStore,
  BOARD_TABS,
} from '@/features/board/store/BoardActiveStateStore';
import { MyProjectApply } from '@/features/projectApply/auth/components/MyProjectApply';
import Posts from '@/features/post/public/posts/components/Posts';
import { Suspense } from 'react';
import CardListSkeleton from '@/components/ui/skeleton/CardListSkeleton';
import { ITEM_COUNT } from '@/utils/constant';
import MyProjects from '@/features/project/auth/myProjects/components/MyProjects';

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
        {activeBoardTab === MANAGE_PROJECT && (
          <Suspense
            fallback={<CardListSkeleton itemCount={ITEM_COUNT.CARDS} />}
          >
            <MyProjects />
          </Suspense>
        )}
      </div>
      <div
        role='tabpanel'
        id={`panel-${PROJECT_POSTS}`}
        tabIndex={0}
        aria-labelledby={`tab-${PROJECT_POSTS}`}
      >
        {activeBoardTab === PROJECT_POSTS && <Posts />}
      </div>
    </section>
  );
}

export default BoardTabPanel;
