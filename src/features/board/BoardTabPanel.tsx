'use client';

import { useRecoilValue } from 'recoil';
import {
  activeBoardTabStore,
  BOARD_TABS,
} from '@/features/board/store/BoardActiveStateStore';
import Posts from '@/features/post/public/contents/posts/Posts';
import { Suspense } from 'react';
import CardListSkeleton from '@/components/ui/skeleton/CardListSkeleton';
import MyProjects from '@/features/project/auth/myProjects/contents/MyProjects';
import MyProjectApplies from '@/features/projectApply/auth/contents/MyProjectApplies';
import { ITEM_COUNT_PER_PAGE } from '@/shared/constants/pagination';

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
        {activeBoardTab === MANAGE_PROJECT && <MyProjectApplies />}
        {activeBoardTab === MANAGE_PROJECT && (
          <Suspense
            fallback={
              <CardListSkeleton itemCount={ITEM_COUNT_PER_PAGE.CARDS} />
            }
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
