'use client';

import MyProjectPosts from '@/components/main/myProjectPost/MyProjectPosts';
import ProjectPosts from '@/features/board/projectPosts';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ParticipateNoticeModal from '@/components/main/myProjectPost/ParticipateNotice/ParticipateNoticeModal';
import Button from '@/components/ui/Button';
import { userNoticeModalStateStore } from '@/store/UserNoticeModalStateStore';
import {
  activeTabState,
  PostTabs,
} from '@/features/board/store/BoardActiveStateStore';

function PostTabContents() {
  const activePostTab = useRecoilValue(activeTabState);
  const setUserNoticeModal = useSetRecoilState(userNoticeModalStateStore);

  return (
    <section>
      <div
        role='tabpanel'
        tabIndex={0}
        aria-labelledby={`${PostTabs.myProjects.name}-tab`}
        id={`${PostTabs.myProjects.name}-panel`}
        className={
          activePostTab.name === PostTabs.myProjects.name ? 'block' : 'hidden'
        }
      >
        <Button
          className='mt-10'
          type='button'
          onClickHandler={() => setUserNoticeModal({ isOpen: true })}
        >
          프로젝트 지원 현황
        </Button>
        <MyProjectPosts
          isActive={activePostTab.name === PostTabs.myProjects.name}
        />
        <ParticipateNoticeModal />
      </div>
      <div
        id={`${PostTabs.recruits.name}-panel`}
        role='tabpanel'
        tabIndex={0}
        aria-labelledby={`${PostTabs.recruits.name}-tab`}
        className={
          activePostTab.name === PostTabs.recruits.name ? 'block' : 'hidden'
        }
      >
        <ProjectPosts />
      </div>
    </section>
  );
}

export default PostTabContents;
