'use client';

import MilestoneCard from '@/features/project/auth/myProject/jobs/components/milestone/card/MilestoneCard';
import CustomSwiper from '@/components/ui/CustomSwiper';
import { MilestoneInfo } from '@/features/project/auth/myProject/jobs/types/milestone';

type MilestonesProps = {
  data: MilestoneInfo[];
  totalCounts: number;
};

const Milestones = ({ data, totalCounts }: MilestonesProps) => {
  if (totalCounts === 0)
    return (
      <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
        <span className='tablet:text-3xl text-grey800 font-semibold'>
          마일스톤을 추가해 주세요
        </span>
      </div>
    );

  return (
    <CustomSwiper
      slideItems={data.map((v) => ({
        key: v.milestoneId.toString(),
        components: <MilestoneCard milestoneInfo={v} />,
      }))}
    />
  );
};

export default Milestones;
