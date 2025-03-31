import React, { use } from 'react';
import CrewList from '@/components/project/crews/CrewList';

function CrewsPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; userId: string }>;
}) {
  const { projectId, userId } = use(searchParams);
  return (
    <section className='w-full mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
      <CrewList projectId={projectId} userId={userId} />
    </section>
  );
}

export default CrewsPage;
