'use client';

import { useRef } from 'react';
import Loader from '@/components/ui/Loader';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import { useMyProjectApplies } from '@/features/projectApply/auth/service/getMyProjectApplies';
import PositionBadge from '@/components/ui/badge/PositionBadge';
import { ProjectApplyStatusBadge } from '@/components/ui/badge/ProjectApplyStatusBadge';

const MyProjectAppliesDetail = () => {
  const bottomRef = useRef<HTMLLIElement | null>(null);
  const rootRef = useRef<HTMLUListElement | null>(null);

  const {
    data: { pages },
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMyProjectApplies();

  useIntersectionObserver({
    target: bottomRef,
    root: rootRef,
    onIntersectHandler: (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
    },
  });

  const totalItemCount = pages[0].data.totalPages;

  return (
    <ul
      role='list'
      className='min-w-[340px] max-h-[300px] overflow-y-auto divide-y divide-gray-100'
      ref={rootRef}
    >
      {totalItemCount > 0 ? (
        pages.map(({ data: { content } }) => {
          return content.map(
            ({
              project_apply_id,
              project_name,
              position_name,
              status: { code: statusCode, name: statusName },
            }) => (
              <li
                key={`projectApply-${project_apply_id}`}
                className='flex items-center justify-between gap-x-6 w-full px-2 py-5'
              >
                <div className='mobile:w-[320px] tablet:w-[450px] flex items-center justify-between'>
                  <div className='min-w-0'>
                    <div className='flex items-center gap-x-3'>
                      <p className='mobile:text-sm tablet:text-xl font-semibold leading-6 text-gray-900'>
                        {project_name}
                      </p>
                      <PositionBadge text={position_name} size='sm' />
                    </div>
                  </div>
                  <div className='flex flex-none items-center'>
                    <ProjectApplyStatusBadge applyStatus={statusCode}>
                      {statusName}
                    </ProjectApplyStatusBadge>
                  </div>
                </div>
              </li>
            ),
          );
        })
      ) : (
        <li className='flex items-center justify-center mobile:w-[320px] tablet:w-[450px] h-[150px] bg-gray-100 rounded-md'>
          <div className='text-xl text-center text-gray-600/80'>
            지원한 프로젝트가 없습니다.
          </div>
        </li>
      )}
      {hasNextPage ? (
        <li
          ref={bottomRef}
          className='border border-red flex items-center w-full h-[80px]'
        >
          <Loader size='sm' />
        </li>
      ) : (
        <li className='flex items-center justify-center w-full h-[100px] text-lg text-center text-gray-600/80'>
          <div>지원한 프로젝트가 더 이상 없습니다.</div>
        </li>
      )}
    </ul>
  );
};

export default MyProjectAppliesDetail;
