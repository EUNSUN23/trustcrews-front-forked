import { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import FWVoteNoticeListItem from '@/features/project/auth/myProject/notice/components/fwVoteNotice/FWVoteNoticeListItem';
import NoItemsContent from '@/features/project/auth/myProject/notice/components/NoItemsContent';
import { useFWVoteNoticeList } from '@/features/project/auth/myProject/notice/service/getFWVoteNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';
import { numStrToBigInt } from '@/utils/common';

const FWVoteNoticeList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { content: alertList, totalPages: totalItemsCount },
    },
  } = useFWVoteNoticeList(numStrToBigInt(projectId), pageIndex);

  // if (isFetching) return <NoticeListLoader />;

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {alertList.map((item) => (
              <FWVoteNoticeListItem key={item.alertId} data={item} />
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

export default FWVoteNoticeList;
