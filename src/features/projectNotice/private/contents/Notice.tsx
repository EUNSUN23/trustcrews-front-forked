import NoticeNavTab from '@/features/projectNotice/private/components/NoticeNavTab';
import RCVoteNotice from '@/features/projectNotice/private/contents/rcVoteNotice/RCVoteNotices';
import FWVoteNotices from '@/features/projectNotice/private/contents/fwVoteNotice/FWVoteNotices';
import CrewNotices from '@/features/projectNotice/private/contents/CrewNotices';
import FWVoteNoticeModal from '@/features/projectNotice/private/components/fwVoteNotice/FWVoteNoticeModal';
import RCVoteNoticeModal from '@/features/projectNotice/private/components/rcVoteNotice/RCVoteNoticeModal';
import { useRecoilValue } from 'recoil';
import { activeNoticeTabStateStore } from '@/features/projectNotice/private/store/ActiveNoticeTabStateStore';
import { NOTICE_TABS } from '@/features/projectNotice/private/constants/noticeTabs';
import { Suspense } from 'react';
import NoticeContentsLoader from '@/features/projectNotice/private/components/NoticeContentsLoader';

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
      contents = <RCVoteNotice />;
      break;
    case FWVOTE_NOTICE_TAB:
      contents = <FWVoteNotices />;
      break;
    case CREW_NOTICE_TAB:
      contents = <CrewNotices />;
      break;
    default:
      throw Error(`Unknown Notice Tab: ${activeNoticeTab}`);
  }

  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <NoticeNavTab />
      <section className='mb-20 tablet:basis-4/5'>
        <Suspense fallback={<NoticeContentsLoader />}>{contents}</Suspense>
        <FWVoteNoticeModal />
        <RCVoteNoticeModal />
      </section>
    </section>
  );
};
