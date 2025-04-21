'use client';

import { MouseEvent } from 'react';
import MilestoneCardMenu from '@/features/project/auth/myProject/jobs/components/milestone/card/MilestoneCardMenu';
import { useRecoilState } from 'recoil';
import { activeMilestoneStateStore } from '@/features/project/auth/myProject/jobs/store/ActiveMilestoneStateStore';
import { MilestoneInfo } from '@/features/project/auth/myProject/jobs/types/milestone';

type MilestoneCardProps = {
  milestoneInfo: MilestoneInfo;
};

const MilestoneCard = ({ milestoneInfo }: MilestoneCardProps) => {
  const [{ milestoneId: activeMilestoneId }, setActiveMilestone] =
    useRecoilState(activeMilestoneStateStore);

  const { milestoneId, content, startDate, endDate } = milestoneInfo;

  const onClickContentHandler = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).dataset.role === 'milestone-menu') return;
    setActiveMilestone(milestoneInfo);
  };

  const activeClass =
    activeMilestoneId === milestoneId ? 'ring-2 ring-primary' : 'shadow-md';
  const textClass =
    activeMilestoneId === milestoneId ? 'text-secondary' : 'text-gray-900';

  return (
    <div
      className={`relative flex pc:max-w-[300px] tablet:max-w-[180px] py-4 items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible ${activeClass} cursor-pointer`}
      onClick={onClickContentHandler}
    >
      <div className='flex-1 truncate px-4 text-sm'>
        <div
          className={`mb-2 flex flex-wrap items-center space-x-2 pc:text-xl tablet:text-lg ${textClass} hover:text-secondary`}
        >
          <span className='max-w-[150px] truncate'>{content}</span>
        </div>
        <div className='flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500'>
          <span>{startDate} &#126;</span>
          <span>{endDate}</span>
        </div>
      </div>
      <MilestoneCardMenu milestoneInfo={milestoneInfo} />
    </div>
  );
};

export default MilestoneCard;
