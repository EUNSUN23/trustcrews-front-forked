import { useState } from 'react';
import Button from '@/components/ui/button';
import ProjectHistoryItem from '@/components/ui/ProjectHistoryItem';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import { useQuery } from '@tanstack/react-query';
import { PageResponseBody, UserProjectHistoryData } from '@/utils/type';
import { getUserProjectHistory } from '@/service/user/user';
import Loader from '@/components/ui/Loader';

type ApplicantProjectHistoryProps = {
  applicantUserId: bigint;
};

const ApplicantProjectHistory = ({
  applicantUserId,
}: ApplicantProjectHistoryProps) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className='my-8 flex flex-col items-center space-y-10'>
      <Button
        theme='black'
        tabIndex={0}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        프로젝트 이력 보기
      </Button>
      {isOpen && (
        <div className='flow-root mx-2'>
          {histories.length > 0 ? (
            <>
              <ul role='list' className='-mb-8 overflow-auto'>
                {histories.map((history, idx) => (
                  <li
                    key={history.userProjectHistoryId}
                    className='relative pb-8'
                  >
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
                onChange={(page) => setPageNumber(page - 1)}
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
      )}
    </div>
  );
};

export default ApplicantProjectHistory;
