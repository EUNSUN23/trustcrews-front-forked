import { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import RCVoteNoticeRow from '@/features/project/auth/projectNotice/components/noticeRow/RCVoteNoticeRow';
import NoContentsMessage from '@/features/project/auth/projectNotice/components/NoContentsMessage';
import { useRCVoteNoticeList } from '@/features/project/auth/projectNotice/service/getRCVoteNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';

import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/shared/constants/pagination';

const RCVoteNotice = () => {
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
              <RCVoteNoticeRow key={item.alertId} data={item} />
            ))}
          </ul>
        ) : (
          <NoContentsMessage />
        )}
      </div>
      <CommonPagination
        activePage={pageIndex + 1}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.LIST_SM}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChange={(pageIndex: number) => setPageIndex(pageIndex - 1)}
      />
    </>
  );
};

export default RCVoteNotice;
