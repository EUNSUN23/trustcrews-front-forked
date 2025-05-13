'use client';

import { useAuthState } from '@/features/user/private/contexts/AuthStateContext';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { activeMainBoardTabStore } from '@/store/ActiveMainBoardTabStateStore';
import MyProjectApplies from '@/features/myProjectApplies/private/contents/MyProjectApplies';
import { useEffect } from 'react';
import CardListSkeleton from '@/shared/ui/skeleton/CardListSkeleton';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import MyProjects from '@/features/project/private/contents/myProjects/MyProjects';
import Posts from '@/features/post/public/contents/posts/Posts';
import MAIN_BOARD_TABS from '@/constants/data/mainBoardTabs';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import PostsSkeleton from '@/features/post/public/contents/posts/PostsSkeleton';

const {
  BM_TAB001: { code: MANAGE_PROJECT_TAB },
  BM_TAB002: { code: POSTS_TAB },
} = MAIN_BOARD_TABS;

const MainBoard = () => {
  const resetActiveBoardTab = useResetRecoilState(activeMainBoardTabStore);

  useEffect(() => {
    resetActiveBoardTab();
  }, [resetActiveBoardTab]);

  const { isAuthorized } = useAuthState();
  const [activeMainBoardTab, setActiveMainBoardTab] = useRecoilState(
    activeMainBoardTabStore,
  );

  const selectedClass = 'border-b-2 border-black100 text-black100';
  const unselectedClass = 'text-greyUnselect';

  const tabList = isAuthorized
    ? Object.values(MAIN_BOARD_TABS)
    : [MAIN_BOARD_TABS.BM_TAB002];

  const handleClickMainBoardTab = (tabName: string) => {
    setActiveMainBoardTab(tabName);
  };

  return (
    <>
      <div role='tablist' aria-label='게시판' className='flex border-b'>
        {tabList.map(({ desc, code }) => (
          <div
            key={`tab-${code}`}
            role='tab'
            id={`tab-${code}`}
            aria-selected={activeMainBoardTab === code}
            aria-controls={`panel-${code}`}
            tabIndex={activeMainBoardTab === code ? 0 : -1}
            className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${
              activeMainBoardTab === code ? selectedClass : unselectedClass
            }`}
            onClick={() => handleClickMainBoardTab(code)}
          >
            {desc}
          </div>
        ))}
      </div>
      <section>
        <div
          role='tabpanel'
          id={`panel-${MANAGE_PROJECT_TAB}`}
          tabIndex={0}
          aria-labelledby={`tab-${MANAGE_PROJECT_TAB}`}
        >
          {activeMainBoardTab === MANAGE_PROJECT_TAB && <MyProjectApplies />}
          {activeMainBoardTab === MANAGE_PROJECT_TAB && (
            <FieldQueryBoundary
              errorFallbackSize='lg'
              suspenseFallback={
                <CardListSkeleton itemCount={ITEM_COUNT_PER_PAGE.CARDS} />
              }
            >
              <MyProjects />
            </FieldQueryBoundary>
          )}
        </div>
        <div
          role='tabpanel'
          id={`panel-${POSTS_TAB}`}
          tabIndex={0}
          aria-labelledby={`tab-${POSTS_TAB}`}
        >
          {activeMainBoardTab === POSTS_TAB && (
            <FieldQueryBoundary
              errorFallbackSize='lg'
              suspenseFallback={<PostsSkeleton />}
            >
              <Posts />
            </FieldQueryBoundary>
          )}
        </div>
      </section>
    </>
  );
};

export default MainBoard;
