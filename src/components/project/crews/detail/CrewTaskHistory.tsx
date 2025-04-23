'use client';

import { useState } from 'react';
import { FaMinus } from '@react-icons/all-files/fa/FaMinus';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import { useCrewTaskHistory } from '@/features/project/auth/myProject/crews/service/getCrewTaskHistory';

const CrewTaskHistory = ({ projectMemberId }: { projectMemberId: string }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const {
    data: {
      data: { content: taskHistory, totalPages },
    },
  } = useCrewTaskHistory(projectMemberId, pageIndex);

  // if (isFetching) return <CrewTaskHistorySkeleton />;

  return (
    <>
      <div className='max-h-[280px] flow-root tablet:mt-10 mobile:mt-8 mb-8 mx-2'>
        {totalPages > 0 ? (
          <ul role='list' className='-mb-8'>
            {taskHistory.map((event, eventIdx) => (
              <li key={event.trustScoreHistoryId}>
                <div className='min-w-0 ml-3 pb-8 flex flex-1 justify-start space-x-8 mobile:space-x-5'>
                  <div className='relative whitespace-nowrap font-semibold tablet:text-lg mobile:text-md text-gray-500'>
                    {eventIdx !== taskHistory.length - 1 ? (
                      <span
                        className='absolute left-[50%] top-7 -ml-px h-full w-0.5 bg-gray-200'
                        aria-hidden='true'
                      />
                    ) : null}
                    <span>{event.createDate}</span>
                  </div>
                  <div className='flex items-center space-x-3 mobile:space-x-1'>
                    {event.point && event.point_type ? (
                      <div className='relative flex items-center'>
                        <span
                          className={`${event.point_type === 'minus' ? 'bg-danger' : 'bg-primary'} ml-4 mr-2 h-6 w-6 rounded-full flex items-center justify-center ring-8 ring-white`}
                        >
                          {event.point_type === 'minus' ? (
                            <FaMinus
                              className='h-4 w-4 text-white bg-danger'
                              aria-hidden='true'
                            />
                          ) : (
                            <FaPlus
                              className='h-4 w-4 text-white bg-primary'
                              aria-hidden='true'
                            />
                          )}
                        </span>
                        <span
                          className={`tablet:min-w-[40px] mobile:min-w-[30px] ${event.point_type === 'minus' ? 'text-danger' : 'text-primary'} leading-none tablet:text-xl mobile:text-lg font-semibold`}
                        >
                          {event.point}
                        </span>
                      </div>
                    ) : null}
                    <div>
                      <p className='tablet:text-lg mobile:text-md text-gray-500'>
                        {event.workContent}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex flex-col items-center justify-center w-full h-[300px] text-3xl text-gray-600/90 text-center bg-gray-200/60 rounded-md'>
            <div className='pb-2'>데이터가 없습니다.</div>
          </div>
        )}
      </div>
      <CommonPagination
        activePage={pageIndex + 1}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        itemsCountPerPage={ITEM_COUNT.LIST_SM}
        totalItemsCount={totalPages}
        onChange={(pageIndex: number) => setPageIndex(pageIndex - 1)}
      />
    </>
  );
};

export default CrewTaskHistory;
