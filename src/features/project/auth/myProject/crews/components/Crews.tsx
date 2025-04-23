'use client';

import CrewList from '@/features/project/auth/myProject/crews/components/CrewList';
import CrewListSkeleton from '@/components/ui/skeleton/project/crews/CrewListSkeleton';
import { Suspense } from 'react';

const Crews = () => {
  return (
    <section className='w-full flex flex-col items-center px-1'>
      <section className='w-full mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
        <Suspense fallback={<CrewListSkeleton />}>
          <CrewList />
        </Suspense>
      </section>
    </section>
  );
};

export default Crews;
