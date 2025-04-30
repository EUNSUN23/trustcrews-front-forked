import { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import NoItemsContent from '@/features/project/auth/notice/components/NoItemsContent';
import CrewNoticeListItem from '@/features/project/auth/notice/components/crewNotice/CrewNoticeListItem';
import { useCrewNoticeList } from '@/features/project/auth/notice/service/getCrewNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { numStrToBigInt } from '@/utils/common';

const CrewNoticeList = () => {
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
            {noticeList.map((item) => (
              <CrewNoticeListItem key={item.alertId} data={item} />
            ))}
          </ul>
        ) : (
          <NoItemsContent />
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

export default CrewNoticeList;
