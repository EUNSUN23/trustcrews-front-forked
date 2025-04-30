'use client';

import { useRecoilValue } from 'recoil';
import RCVoteNoticeList from '@/features/project/auth/myProject/notice/components/rcVoteNotice/RCVoteNoticeList';
import VAlertFWList from '@/features/project/auth/myProject/notice/components/fwVoteNotice/FWVoteNoticeList';
import FWVoteNoticeModal from '@/features/project/auth/myProject/notice/components/fwVoteNotice/FWVoteNoticeModal';
import RCVoteNoticeModal from '@/features/project/auth/myProject/notice/components/rcVoteNotice/RCVoteNoticeModal';
import CrewNoticeList from '@/features/project/auth/myProject/notice/components/crewNotice/CrewNoticeList';
import { activeNoticeTabStateStore } from '@/features/project/auth/myProject/notice/store/ActiveNoticeTabStateStore';

function NoticePage() {
  const activeNoticeMenu = useRecoilValue(activeNoticeTabStateStore);

  return (
    <section className='mb-20 tablet:basis-4/5'>
      {activeNoticeMenu.name === '모집' && <RCVoteNoticeList />}
      {activeNoticeMenu.name === '강제탈퇴' && <VAlertFWList />}
      {activeNoticeMenu.name === '크루' && <CrewNoticeList />}
      <FWVoteNoticeModal />
      <RCVoteNoticeModal />
    </section>
  );
}

export default NoticePage;
