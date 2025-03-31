import { useState } from 'react';
import ProjectHistoryItem from '@/components/user/profile/projectHistory/ProjectHistoryItem';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import { PageResponseBody, UserProjectHistoryData } from '@/utils/type';
import { useQuery } from '@tanstack/react-query';
import { getUserProjectHistory } from '@/service/user/user';
import Loader from '@/components/ui/Loader';

function ApplicantProjectHistoryList({
  isOpen,
  applicantUserId,
}: {
  isOpen: boolean;
  applicantUserId: bigint;
}) {
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isFetching } = useQuery<
    PageResponseBody<UserProjectHistoryData[]>,
    Error
  >({
    queryKey: ['userHistory', pageNumber, applicantUserId],
    queryFn: () => getUserProjectHistory(pageNumber, applicantUserId),
    enabled: isOpen,
  });

  if (isFetching) return <Loader size='md' />;

  const { content: histories, totalPages } = data!.data;

  return (
    <div className='flow-root mx-2'>
      {histories.length > 0 ? (
        <>
          <ul role='list' className='-mb-8 overflow-auto'>
            {histories.map((history, idx) => (
              <li key={history.userProjectHistoryId} className='relative pb-8'>
                <ProjectHistoryItem
                  history={history}
                  isLast={idx === histories.length - 1}
                />
              </li>
            ))}
          </ul>
          <CommonPagination
            activePage={pageNumber + 1}
            itemsCountPerPage={ITEM_COUNT.LIST_SM}
            totalItemsCount={totalPages}
            pageRangeDisplayed={PAGE_RANGE.DEFAULT}
            onChangePageHandler={(page) => setPageNumber(page - 1)}
          />
        </>
      ) : (
        <div className='w-full bg-ground100 text-center rounded-md mb-10 mobile:mb-4'>
          <p className='py-10 text-2xl font-medium text-grey900'>
            이력이 존재하지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}

export default ApplicantProjectHistoryList;
