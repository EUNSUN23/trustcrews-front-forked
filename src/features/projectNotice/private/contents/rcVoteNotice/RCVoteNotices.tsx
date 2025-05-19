import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import NoContentsMessage from '@/features/projectNotice/private/components/NoContentsMessage';
import { useRCVoteNoticeList } from '@/features/projectNotice/private/service/getRCVoteNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import RCVoteNoticeRow from '@/features/projectNotice/private/components/rcVoteNotice/RCVoteNoticeRow';

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
