import NoticeBadge from '@/components/ui/badge/NoticeBadge';
import { NOTICE_TYPES } from '@/features/project/auth/myProject/notice/constants/noticeTypes';
import { CrewNoticeData } from '@/features/project/auth/myProject/notice/service/getCrewNoticeList';

type CrewNoticeListItemProps = {
  data: CrewNoticeData;
};

const CrewNoticeListItem = ({ data }: CrewNoticeListItemProps) => {
  const { contents, createDate } = data;
  return (
    <li className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900'>
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={NOTICE_TYPES.PRA2001.code}>
          {NOTICE_TYPES.PRA2001.name}
        </NoticeBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default CrewNoticeListItem;
