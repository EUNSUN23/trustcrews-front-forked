'use client';

import Milestones from '@/components/project/work/milestone/Milestones';
import MilestoneAddButton from '@/components/project/work/milestone/MilestoneAddButton';
import TaskSection from '@/components/project/work/work/TaskSection';
import MilestoneAddModal from '@/components/project/work/milestone/modal/add/MilestoneAddModal';
import MilestoneModModal from '@/components/project/work/milestone/modal/mod/MilestoneModModal';
import TaskAddModal from '@/components/project/work/work/modal/add/TaskAddModal';
import TaskModModal from '@/components/project/work/work/modal/mod/TaskModModal';

function TaskPage({
  searchParams: { projectId, userId },
}: {
  searchParams: { projectId: string; userId: string };
}) {
  return (
    <>
      <section className='w-full flex flex-col items-start'>
        <MilestoneAddButton projectId={projectId} userId={userId} />
        <Milestones projectId={projectId} />
        <TaskSection projectId={projectId} />
      </section>
      <MilestoneModModal />
      <MilestoneAddModal />
      <TaskAddModal />
      <TaskModModal />
    </>
  );
}

export default TaskPage;
