import { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import RCVoteNoticeListItem from '@/features/project/auth/projectNotice/components/rcVoteNotice/RCVoteNoticeListItem';
import NoItemsContent from '@/features/project/auth/projectNotice/components/NoItemsContent';
import { useRCVoteNoticeList } from '@/features/project/auth/projectNotice/service/getRCVoteNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { numStrToBigInt } from '@/utils/common';

const RCVoteNoticeList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { content: alertList, totalPages: totalItemsCount },
    },
  } = useRCVoteNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {alertList.map((item) => (
              <RCVoteNoticeListItem key={item.alertId} data={item} />
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

export default RCVoteNoticeList;
