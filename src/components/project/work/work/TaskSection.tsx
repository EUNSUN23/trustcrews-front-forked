'use client';

import Tasks from '@/components/project/work/work/Tasks';
import TaskSectionHeader from '@/components/project/work/TaskSectionHeader';
import { TaskSectionSkeleton } from '@/components/ui/skeleton/project/task';
import { milestoneActiveStateStore } from '@/store/project/task/MilestoneStateStore';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useMilestones } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestones';

function TaskSection({ projectId }: { projectId: string }) {
  const [activeMilestone, setActiveMilestone] = useRecoilState(
    milestoneActiveStateStore,
  );

  const {
    activeMilestone: initActiveMilestone,
    activeMilestoneId: initActiveMilestoneId,
    milestoneList,
  } = useMilestones(projectId);

  // milestoneActiveStateStore 초기화
  useEffect(() => {
    if (initActiveMilestone && activeMilestone.activeMilestoneIndex === null) {
      setActiveMilestone({
        activeMilestone: initActiveMilestone,
        activeMilestoneId: initActiveMilestoneId,
        activeMilestoneIndex: initActiveMilestone.index!,
      });
    }
  }, [
    initActiveMilestone,
    activeMilestone.activeMilestoneIndex,
    setActiveMilestone,
    initActiveMilestoneId,
  ]);

  // if (isMilestoneFetching) return <TaskSectionSkeleton />;
  if (milestoneList.length > 0 && activeMilestone.activeMilestoneIndex === null)
    return <TaskSectionSkeleton />;

  return milestoneList.length > 0 ? (
    <section className='w-full mt-12 flex flex-col items-start'>
      <TaskSectionHeader milestoneInfo={activeMilestone.activeMilestone!} />
      <Tasks
        projectId={projectId}
        milestoneId={activeMilestone.activeMilestoneId!}
      />
    </section>
  ) : null;
}

export default TaskSection;
