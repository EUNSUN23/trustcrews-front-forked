'use client';

import CrewList from '@/components/project/crews/CrewList';

function CrewsPage({
  searchParams: { projectId, userId },
}: {
  searchParams: { projectId: string; userId: string };
}) {
  return (
    <section className='w-full mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
      <CrewList projectId={projectId} userId={userId} />
    </section>
  );
}

export default CrewsPage;
