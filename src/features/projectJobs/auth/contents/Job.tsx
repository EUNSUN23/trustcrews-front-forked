'use client';

import MilestoneAddButton from '@/features/projectJobs/auth/components/milestone/MilestoneAddButton';
import Milestones from '@/features/projectJobs/auth/contents/milestone/Milestones';
import { useMilestones } from '@/features/projectJobs/auth/service/milestone/getMilestones';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/features/project/auth/store/myProject/ProjectIdStateStore';
import TaskAddButton from '@/features/projectJobs/auth/components/task/TaskAddButton';
import Tasks from '@/features/projectJobs/auth/contents/task/Tasks';
import { useEffect } from 'react';
import {
  activeMilestoneStateStore,
  DEFAULT_ACTIVE_MILESTONE,
} from '@/features/projectJobs/auth/store/ActiveMilestoneStateStore';
import JobSkeleton from '@/features/projectJobs/auth/contents/JobSkeleton';
import MilestoneModModal from '@/features/projectJobs/auth/contents/milestone/MilestoneModModal';
import MilestoneAddModal from '@/features/projectJobs/auth/contents/milestone/MilestoneAddModal';
import TaskAddModal from '@/features/projectJobs/auth/contents/task/TaskAddModal';
import TaskModModal from '@/features/projectJobs/auth/contents/task/TaskModModal';
import TasksSkeleton from '@/features/projectJobs/auth/contents/task/TasksSkeleton';
import { bigIntToString } from '@/shared/utils/stringUtils';
import FieldQueryBoundary from '@/ui/error/FieldQueryBoundary';

const { milestoneId: DEFAULT_MILESTONE_ID } = DEFAULT_ACTIVE_MILESTONE;

const Job = () => {
  const [{ milestoneId: activeMilestoneId }, setActiveMilestone] =
    useRecoilState(activeMilestoneStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: { data },
  } = useMilestones(projectId);

  const initActiveMilestone = data[0];

  useEffect(() => {
    if (initActiveMilestone) {
      setActiveMilestone({
        milestoneId: bigIntToString(initActiveMilestone.milestoneId),
        index: initActiveMilestone.index,
        startDate: initActiveMilestone.startDate,
        endDate: initActiveMilestone.endDate,
      });
    }

    return () => {
      resetActiveMilestone();
    };
  }, [initActiveMilestone, setActiveMilestone, resetActiveMilestone]);

  if (initActiveMilestone && activeMilestoneId === DEFAULT_MILESTONE_ID)
    return <JobSkeleton />;

  return (
    <section className='w-full tablet:px-2 flex flex-col justify-between space-y-[6rem]'>
      <section className='w-full flex flex-col items-start'>
        <MilestoneAddButton />
        <Milestones data={data} totalCounts={data.length} />
        <section className='w-full mt-12 flex flex-col items-start'>
          <div className='w-full flex mobile:flex-col mobile:items-start items-center justify-start mobile:space-y-4 tablet:mb-4'>
            <TaskAddButton />
            {initActiveMilestone && (
              <div className='flex-wrap flex mobile:flex-col items-center mobile:items-start tablet:ml-4 mr-auto space-x-3 mobile:space-x-0'>
                <h3 className='max-w-[300px] my-1 tablet:text-3xl mobile:text-lg font-medium text-greyDarkBlue truncate'>
                  {initActiveMilestone.content}
                </h3>
                <div className='flex-wrap flex items-center space-x-2 tablet:text-xl mobile:text-base text-grey800'>
                  <span>{initActiveMilestone.startDate}</span>
                  <span>&#126;</span>
                  <span>{initActiveMilestone.endDate}</span>
                </div>
              </div>
            )}
          </div>
          <FieldQueryBoundary
            errorFallbackSize='md'
            suspenseFallback={<TasksSkeleton />}
          >
            <Tasks />
          </FieldQueryBoundary>
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
