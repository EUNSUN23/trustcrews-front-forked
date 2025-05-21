import NoticeNavTab from '@/entities/projectNotice/components/NoticeNavTab';
import RCVoteNotice from '@/features/projectNotice/contents/rcVoteNotice/RCVoteNotices';
import FWVoteNotices from '@/features/projectNotice/contents/fwVoteNotice/FWVoteNotices';
import CrewNotices from '@/features/projectNotice/contents/crewNotice/CrewNotices';
import FWVoteNoticeModal from '@/features/projectNotice/components/fwVoteNotice/FWVoteNoticeModal';
import RCVoteNoticeModal from '@/features/projectNotice/components/rcVoteNotice/RCVoteNoticeModal';
import { useRecoilValue } from 'recoil';
import { activeNoticeTabStateStore } from '@/entities/projectNotice/store/ActiveNoticeTabStateStore';
import { NOTICE_TABS } from '@/entities/projectNotice/constants/noticeTabs';
import ContentsLoader from '@/shared/ui/ContentsLoader';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import { ApplicationError } from '@/utils/error/ApplicationError';

const {
  NTAB001: { code: RCVOTE_NOTICE_TAB },
  NTAB002: { code: FWVOTE_NOTICE_TAB },
  NTAB003: { code: CREW_NOTICE_TAB },
} = NOTICE_TABS;

export const ProjectNotice = () => {
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
      throw new ApplicationError(`Unknown Notice Tab: ${activeNoticeTab}`);
  }

  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <NoticeNavTab />
      <section className='mb-20 tablet:basis-4/5'>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<ContentsLoader />}
        >
          {contents}
        </FieldQueryBoundary>
        <FWVoteNoticeModal />
        <RCVoteNoticeModal />
      </section>
    </section>
  );
};
