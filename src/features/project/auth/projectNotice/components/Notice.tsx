import NoticeNavTab from '@/features/project/auth/projectNotice/components/NoticeNavTab';
import RCVoteNoticeList from '@/features/project/auth/projectNotice/components/rcVoteNotice/RCVoteNoticeList';
import FWVoteNoticeList from '@/features/project/auth/projectNotice/components/fwVoteNotice/FWVoteNoticeList';
import CrewNoticeList from '@/features/project/auth/projectNotice/components/crewNotice/CrewNoticeList';
import FWVoteNoticeModal from '@/features/project/auth/projectNotice/components/fwVoteNotice/FWVoteNoticeModal';
import RCVoteNoticeModal from '@/features/project/auth/projectNotice/components/rcVoteNotice/RCVoteNoticeModal';
import { useRecoilValue } from 'recoil';
import { activeNoticeTabStateStore } from '@/features/project/auth/projectNotice/store/ActiveNoticeTabStateStore';
import { NOTICE_TABS } from '@/features/project/auth/projectNotice/constants/noticeTabs';
import { Suspense } from 'react';
import NoticeListLoader from '@/features/project/auth/projectNotice/components/NoticeListLoader';

const {
  NTAB001: { code: RCVOTE_NOTICE_TAB },
  NTAB002: { code: FWVOTE_NOTICE_TAB },
  NTAB003: { code: CREW_NOTICE_TAB },
} = NOTICE_TABS;

export const Notice = () => {
  const { code: activeNoticeTab } = useRecoilValue(activeNoticeTabStateStore);

  let contents = null;
  switch (activeNoticeTab) {
    case RCVOTE_NOTICE_TAB:
      contents = <RCVoteNoticeList />;
      break;
    case FWVOTE_NOTICE_TAB:
      contents = <FWVoteNoticeList />;
      break;
    case CREW_NOTICE_TAB:
      contents = <CrewNoticeList />;
      break;
    default:
      throw Error(`Unknown Notice Tab: ${activeNoticeTab}`);
  }

  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <NoticeNavTab />
      <section className='mb-20 tablet:basis-4/5'>
        <Suspense fallback={<NoticeListLoader />}>{contents}</Suspense>
        <FWVoteNoticeModal />
        <RCVoteNoticeModal />
      </section>
    </section>
  );
};
