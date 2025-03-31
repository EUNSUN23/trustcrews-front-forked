'use client';
import React, { useState } from 'react';
import CommonPagination from '@/components/ui/CommonPagination';
import { getUserMeProjectHistory } from '@/service/user/user';
import { PageResponseBody, UserProjectHistoryData } from '@/utils/type';
import { useQuery } from '@tanstack/react-query';
import { GrScorecard } from '@react-icons/all-files/gr/GrScorecard';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import ProjectHistorySkeleton from '@/components/user/profile/projectHistory/ProjectHistorySkeleton';
import ProjectHistoryItem from '@/components/user/profile/projectHistory/ProjectHistoryItem';

function ProjectHistory() {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isFetching } = useQuery<
    PageResponseBody<UserProjectHistoryData[]>,
    Error
  >({
    queryKey: ['userHistory', pageNumber],
    queryFn: () => getUserMeProjectHistory(pageNumber),
    staleTime: 0,
    // retry: false
  });

  if (isFetching) return <ProjectHistorySkeleton />;

  const { content: histories, totalPages } = data!.data;

  return (
    <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
      <div className='flex items-center tablet:text-[26px] mobile:text-lg font-semibold text-greyDarkBlue my-10 mobile:my-5'>
        <GrScorecard className='tablet:text-[1.5rem]' />
        <h3 className='ml-2'>프로젝트 이력</h3>
      </div>
      <div className='flow-root mx-2'>
        {histories.length > 0 ? (
          <>
            <ul role='list' className='-mb-8'>
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
    </div>
  );
}

export default ProjectHistory;
