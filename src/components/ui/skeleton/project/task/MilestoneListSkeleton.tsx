'use client';

import { useEffect, useState } from 'react';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { useMediaQuery } from 'react-responsive';

function MilestoneListSkeleton() {
  const [itemCount, setItemCount] = useState(3);
  const mobile = useMediaQuery({ maxWidth: 700 });

  useEffect(() => {
    if (mobile) setItemCount(1);
  }, [mobile, setItemCount]);

  return (
    itemCount > 0 && (
      <>
        <ul className='w-full tablet:mt-8 mobile:mt-6 grid justify-items-center pc:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-4 mobile:gap-0'>
          {Array(itemCount)
            .fill(null)
            .map((v, idex) => (
              <li key={idex}>
                <Skeleton className='pc:w-[274px] tablet:w-[180px] mobile:w-[274px] h-[98px] py-4'></Skeleton>
              </li>
            ))}
        </ul>
        <div className='my-10 w-full flex items-center justify-center space-x-2 '>
          <span className='w-[8px] h-[8px] rounded-full bg-gray-200 animate-pulse'></span>
          <span className='w-[8px] h-[8px] rounded-full bg-gray-200 animate-pulse'></span>
        </div>
      </>
    )
  );
}

export default MilestoneListSkeleton;
