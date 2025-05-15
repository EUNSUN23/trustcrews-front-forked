import NoticeBadge from '@/features/projectNotice/auth/components/NoticeBadge';
import VoteStatusBadge from '@/features/projectNotice/auth/components/VoteStatusBadge';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NOTICE_TYPES } from '@/features/projectNotice/auth/constants/noticeTypes';
import { fwNoticeModalState } from '@/features/projectNotice/auth/store/FWVoteNoticeModalStateStore';
import { FWVoteNoticeData } from '@/features/projectNotice/auth/service/getFWVoteNoticeList';
import { projectIdState } from '@/features/project/auth/store/myProject/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/projectConfig/auth/store/ProjectManageAuthStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';

type VAlertFwListItemProps = {
  data: FWVoteNoticeData;
};

const FWVoteNoticeRow = ({ data }: VAlertFwListItemProps) => {
  const setVAlertFWModalState = useSetRecoilState(fwNoticeModalState);
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    noticeId,
    contents,
    createDate,
    voteStatus,
    voteId,
    crewId,
    crewPMAuth: { code: crewPMAuth },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertFWModalState({
      isOpen: true,
      title: contents,
      projectId,
      voteId: bigIntToString(voteId),
      crewId: bigIntToString(crewId),
      userPMAuth,
      crewPMAuth,
    });
  };

  return (
    <li
      key={`fwVoteNotice-${noticeId}`}
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

export default FWVoteNoticeRow;
