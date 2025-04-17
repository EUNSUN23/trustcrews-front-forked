'use client';

import { useRef } from 'react';
import MyProjectApplyItem from '@/features/projectApply/auth/components/MyProjectApplyItem';
import Loader from '@/components/ui/Loader';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import { useMyProjectApplies } from '@/features/projectApply/auth/service/getMyProjectApplies';

function ProjectApplyStatusList() {
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
          return content.map((item) => (
            <li
              key={`projectApply-${item.project_apply_id}`}
              className='flex items-center justify-between gap-x-6 w-full px-2 py-5'
            >
              <MyProjectApplyItem myProjectApply={item} />
            </li>
          ));
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
}

export default ProjectApplyStatusList;
