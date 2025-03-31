import React, { use } from 'react';
import CrewProfile from '@/components/project/crews/detail/crewProfile/CrewProfile';
import { GrScorecard } from '@react-icons/all-files/gr/GrScorecard';
import CrewTaskHistory from '@/components/project/crews/detail/CrewTaskHistory';
import HomeNav from '@/components/ui/HomeNav';
import FwCreateModal from '@/components/project/crews/detail/modal/FWCreateModal';

function CrewDetailPage({
  searchParams,
}: {
  searchParams: Promise<{
    projectMemberId: string;
    projectId: string;
    userId: string;
  }>;
}) {
  const { projectMemberId, projectId, userId } = use(searchParams);
  return (
    <>
      <section className='w-fit tablet:translate-x-[-50%] mobile:translate-x-[-20%]'>
        <HomeNav
          to={{
            pathname: '/project',
            query: { projectId, userId },
          }}
        />
      </section>
      <section className='pc:min-h-[280px] tablet:py-3 border-b-2 border-gray-200'>
        <CrewProfile projectMemberId={projectMemberId} />
      </section>
      <section className='mt-12'>
        <div className='flex items-center tablet:text-3xl mobile:text-xl font-semibold text-greyDarkBlue'>
          <GrScorecard className='tablet:text-[1.5rem]' />
          <h3 className='ml-2'>업무 이력</h3>
        </div>
        <CrewTaskHistory projectMemberId={projectMemberId} />
      </section>
      <FwCreateModal />
    </>
  );
}

export default CrewDetailPage;
