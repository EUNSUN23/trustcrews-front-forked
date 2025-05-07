'use client';

import MilestoneAddButton from '@/features/project/auth/projectJobs/components/MilestoneAddButton';
import Milestones from '@/features/project/auth/projectJobs/contents/milestone/Milestones';
import { useMilestones } from '@/features/project/auth/projectJobs/service/milestone/getMilestones';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import TaskAddButton from '@/features/project/auth/projectJobs/components/TaskAddButton';
import Tasks from '@/features/project/auth/projectJobs/contents/task/Tasks';
import { Suspense, useEffect } from 'react';
import {
  activeMilestoneStateStore,
  DEFAULT_ACTIVE_MILESTONE,
} from '@/features/project/auth/projectJobs/store/ActiveMilestoneStateStore';
import JobSkeleton from '@/features/project/auth/projectJobs/contents/JobSkeleton';
import MilestoneModModal from '@/features/project/auth/projectJobs/contents/milestone/MilestoneModModal';
import MilestoneAddModal from '@/features/project/auth/projectJobs/contents/milestone/MilestoneAddModal';
import TaskAddModal from '@/features/project/auth/projectJobs/contents/task/TaskAddModal';
import TaskModModal from '@/features/project/auth/projectJobs/contents/task/TaskModModal';
import TasksSkeleton from '@/features/project/auth/projectJobs/contents/task/TasksSkeleton';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/shared/constants/pagination';

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
          <Suspense
            fallback={
              <TasksSkeleton itemCount={ITEM_COUNT_PER_PAGE.CARDS_SM} />
            }
          >
            <Tasks />
          </Suspense>
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
