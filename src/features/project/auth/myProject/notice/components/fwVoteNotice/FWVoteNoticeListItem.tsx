import NoticeBadge from '@/components/ui/badge/NoticeBadge';
import VoteStatusBadge from '@/components/ui/badge/VoteStatusBadge';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NOTICE_TYPES } from '@/features/project/auth/myProject/notice/constants/noticeTypes';
import { fwNoticeModalState } from '@/features/project/auth/myProject/notice/store/FWVoteNoticeModalStateStore';
import { FWVoteNoticeData } from '@/features/project/auth/myProject/notice/service/getFWVoteNoticeList';
import { bigIntToString } from '@/utils/common';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/project/auth/myProject/global/store/ProjectManageAuthStateStore';

type VAlertFwListItemProps = {
  data: FWVoteNoticeData;
};

const FWVoteNoticeListItem = ({ data }: VAlertFwListItemProps) => {
  const setVAlertFWModalState = useSetRecoilState(fwNoticeModalState);
  const projectId = useRecoilValue(projectIdState);
  const { code: userAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    alertId,
    contents,
    createDate,
    voteStatus,
    voteId,
    crewId,
    crewAuth: { code: crewAuth },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertFWModalState({
      isOpen: true,
      title: contents,
      projectId,
      voteId: bigIntToString(voteId),
      crewId: bigIntToString(crewId),
      userAuth,
      crewAuth,
    });
  };

  return (
    <li
      key={`fwVoteNotice-${alertId}`}
      className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
      onClick={handleClickNoticeItem}
    >
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={NOTICE_TYPES.PRA1003.code}>
          {NOTICE_TYPES.PRA1003.name}
        </NoticeBadge>
        <VoteStatusBadge voteStatus={voteStatus.code}>
          {voteStatus.name}
        </VoteStatusBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default FWVoteNoticeListItem;
