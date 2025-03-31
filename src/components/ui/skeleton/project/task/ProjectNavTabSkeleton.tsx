'use client';

import React from 'react';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { PROJECT_MENU } from '@/app/project/_utils/constant';

function ProjectNavTabSkeleton() {
  return (
    <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
      <div className='border-b-[3px] border-grey300'>
        <nav
          className='-mb-px flex tablet:space-x-10 mobile:justify-between'
          aria-label='Tabs'
        >
          {Object.values(PROJECT_MENU).map((v) => (
            <Skeleton
              key={v.name}
              sizeClassName='w-[50px] h-[45px] -mb-[1.8px] py-4 px-1 mobile:px-4'
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ProjectNavTabSkeleton;
