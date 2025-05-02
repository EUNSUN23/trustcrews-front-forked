import { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import NoContentsMessage from '@/features/project/auth/projectNotice/components/NoContentsMessage';
import { useCrewNoticeList } from '@/features/project/auth/projectNotice/service/getCrewNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { numStrToBigInt } from '@/utils/common';
import NoticeBadge from '@/components/ui/badge/NoticeBadge';
import { NOTICE_TYPES } from '@/features/project/auth/projectNotice/constants/noticeTypes';

const CrewNotices = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: {
      data: { content: noticeList, totalPages: totalItemsCount },
    },
  } = useCrewNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {noticeList.map(({ alertId, contents, createDate }) => (
              <li
                key={`crewNotice-${alertId}`}
                className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900'
              >
                <div className='flex items-center gap-x-4'>
                  <NoticeBadge noticeType={NOTICE_TYPES.PRA2001.code}>
                    {NOTICE_TYPES.PRA2001.name}
                  </NoticeBadge>
                  {contents}
                </div>
                <div className='ml-auto text-grey600'>{createDate}</div>
              </li>
            ))}
          </ul>
        ) : (
          <NoContentsMessage />
        )}
      </div>
      <CommonPagination
        activePage={pageIndex + 1}
        itemsCountPerPage={ITEM_COUNT.LIST_SM}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChange={(pageIndex: number) => setPageIndex(pageIndex - 1)}
      />
    </>
  );
};

export default CrewNotices;
