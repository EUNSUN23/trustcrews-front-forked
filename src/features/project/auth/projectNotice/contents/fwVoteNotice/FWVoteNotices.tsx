import { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import FWVoteNoticeRow from '@/features/project/auth/projectNotice/components/noticeRow/FWVoteNoticeRow';
import NoContentsMessage from '@/features/project/auth/projectNotice/components/NoContentsMessage';
import { useFWVoteNoticeList } from '@/features/project/auth/projectNotice/service/getFWVoteNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { numStrToBigInt } from '@/utils/common';

const FWVoteNotices = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { content: alertList, totalPages: totalItemsCount },
    },
  } = useFWVoteNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {alertList.map((item) => (
              <FWVoteNoticeRow key={item.alertId} data={item} />
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

export default FWVoteNotices;
