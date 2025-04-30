import NoticeBadge from '@/components/ui/badge/NoticeBadge';
import VoteStatusBadge from '@/components/ui/badge/VoteStatusBadge';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NOTICE_TYPES } from '@/features/project/auth/notice/constants/noticeTypes';
import { rcVoteNoticeModalState } from '@/features/project/auth/notice/store/RCVoteNoticeModalStateStore';
import { bigIntToString } from '@/utils/common';
import { projectManageAuthStateStore } from '@/features/project/auth/global/store/ProjectManageAuthStateStore';
import { RCVoteNoticeData } from '@/features/project/auth/notice/service/getRCVoteNoticeList';

const {
  PRA1002: { code: RecruitNoticeCode, name: RecruitNoticeName },
} = NOTICE_TYPES;

type RCVoteNoticeListItemProps = {
  data: RCVoteNoticeData;
};

const RCVoteNoticeListItem = ({ data }: RCVoteNoticeListItemProps) => {
  const setVAlertRecruitModalState = useSetRecoilState(rcVoteNoticeModalState);
  const { code: userAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    alertId,
    voteId,
    applyId,
    contents,
    createDate,
    voteStatus: { code: voteStatusCode, name: voteStatusName },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertRecruitModalState({
      isOpen: true,
      title: contents,
      voteId: bigIntToString(voteId),
      alertId: bigIntToString(alertId),
      applyId: bigIntToString(applyId),
      userAuth,
    });
  };

  return (
    <li
      key={`recruitNotice-${alertId}`}
      className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer'
      onClick={handleClickNoticeItem}
    >
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={RecruitNoticeCode}>
          {RecruitNoticeName}
        </NoticeBadge>
        <VoteStatusBadge voteStatus={voteStatusCode}>
          {voteStatusName}
        </VoteStatusBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default RCVoteNoticeListItem;
