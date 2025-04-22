'use client';

import MilestoneAddButton from '@/features/project/auth/myProject/jobs/components/milestone/MilestoneAddButton';
import Milestones from '@/features/project/auth/myProject/jobs/components/milestone/Milestones';
import { useMilestones } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestones';
import { useRecoilState, useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';
import TaskAddButton from '@/features/project/auth/myProject/jobs/components/task/TaskAddButton';
import Tasks from '@/features/project/auth/myProject/jobs/components/task/Tasks';
import { useEffect } from 'react';
import { activeMilestoneStateStore } from '@/features/project/auth/myProject/jobs/store/ActiveMilestoneStateStore';
import JobSkeleton from '@/features/project/auth/myProject/jobs/components/JobSkeleton';
import MilestoneModModal from '@/features/project/auth/myProject/jobs/components/milestone/modal/mod/MilestoneModModal';
import MilestoneAddModal from '@/features/project/auth/myProject/jobs/components/milestone/modal/add/MilestoneAddModal';
import TaskAddModal from '@/features/project/auth/myProject/jobs/components/task/modal/add/TaskAddModal';
import TaskModModal from '@/features/project/auth/myProject/jobs/components/task/modal/mod/TaskModModal';

const Job = () => {
  const [activeMilestone, setActiveMilestone] = useRecoilState(
    activeMilestoneStateStore,
  );
  const projectId = useRecoilValue(projectIdState);
  const {
    data: { data },
  } = useMilestones(projectId);

  const initActiveMilestone = data[0];

  useEffect(() => {
    if (!activeMilestone) setActiveMilestone(initActiveMilestone);
  }, [activeMilestone, setActiveMilestone, initActiveMilestone]);

  if (!activeMilestone) return <JobSkeleton />;

  const { content, startDate, endDate } = activeMilestone;

  return (
    <section className='w-full tablet:px-2 flex flex-col justify-between space-y-[6rem]'>
      <section className='w-full flex flex-col items-start'>
        <MilestoneAddButton />
        <Milestones data={data} totalCounts={data.length} />
        <section className='w-full mt-12 flex flex-col items-start'>
          <div className='w-full flex mobile:flex-col mobile:items-start items-center justify-start mobile:space-y-4 tablet:mb-4'>
            <TaskAddButton />
            <div className='flex-wrap flex mobile:flex-col items-center mobile:items-start tablet:ml-4 mr-auto space-x-3 mobile:space-x-0'>
              <h3 className='max-w-[300px] my-1 tablet:text-3xl mobile:text-lg font-medium text-greyDarkBlue truncate'>
                {content}
              </h3>
              <div className='flex-wrap flex items-center space-x-2 tablet:text-xl mobile:text-base text-grey800'>
                <span>{startDate}</span>
                <span>&#126;</span>
                <span>{endDate}</span>
              </div>
            </div>
          </div>
          <Tasks />
        </section>
      </section>
      <MilestoneModModal />
      <MilestoneAddModal />
      <TaskAddModal />
      <TaskModModal />
    </section>
  );
};

export default Job;
