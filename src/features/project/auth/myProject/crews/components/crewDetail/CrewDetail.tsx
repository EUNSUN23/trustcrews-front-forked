import { GrScorecard } from '@react-icons/all-files/gr/GrScorecard';
import CrewTaskHistory from '@/features/project/auth/myProject/crews/components/crewDetail/CrewTaskHistory';
import CrewFWCreateModal from '@/features/project/auth/myProject/crews/components/crewDetail/CrewFWCreateModal';
import { Suspense } from 'react';
import CrewProfileSkeleton from '@/components/ui/skeleton/project/crews/detail/CrewProfileSkeleton';
import CrewTaskHistorySkeleton from '@/components/ui/skeleton/project/crews/detail/CrewTaskHistorySkeleton';
import CrewProfile from '@/features/project/auth/myProject/crews/components/crewDetail/CrewProfile';

export const CrewDetail = () => {
  return (
    <section className='w-full flex flex-col items-center px-1 '>
      {/*<section className='w-fit tablet:translate-x-[-50%] mobile:translate-x-[-20%]'>*/}
      {/*    <HomeNav*/}
      {/*        to={{*/}
      {/*            pathname: '/project',*/}
      {/*            query: { projectId, userId },*/}
      {/*        }}*/}
      {/*    />*/}
      {/*</section>*/}
      <section className='pc:min-h-[300px] tablet:py-3 border-b-2 border-gray-200'>
        <Suspense fallback={<CrewProfileSkeleton />}>
          <CrewProfile />
        </Suspense>
      </section>
      <section className='pc:w-[95%] tablet:w-[95%] mobile:min-w-[75%] mt-12 mobile:mt-6'>
        <div className='flex items-center pc:text-3xl tablet:text-2xl mobile:text-lg font-semibold text-greyDarkBlue'>
          <GrScorecard className='tablet:text-[1.5rem]' />
          <h3 className='ml-2'>업무 이력</h3>
        </div>
        <Suspense fallback={<CrewTaskHistorySkeleton />}>
          <CrewTaskHistory />
        </Suspense>
      </section>
      <CrewFWCreateModal />
    </section>
  );
};
