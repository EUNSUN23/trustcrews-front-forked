'use client';

import MilestoneCard from '@/components/project/work/milestone/MilestoneCard';
import CustomSwiper from '@/components/ui/CustomSwiper';
import { useProjectManageAuth } from '@/lib/getProjectManageAuth';
import { useMilestones } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestones';

function Milestones({ projectId }: { projectId: string }) {
  const {
    data: { data: currentUserPMAuth },
  } = useProjectManageAuth(projectId);
  const {
    milestoneList,
    activeMilestoneIndex: initActiveMilestoneIndex,
    activeMilestoneId: initActiveMilestoneId,
  } = useMilestones(projectId);

  // if (isMilestoneFetching) return <MilestoneListSkeleton />;

  return milestoneList!.length < 1 ? (
    <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
      <span className='tablet:text-3xl text-grey800 font-semibold'>
        마일스톤을 추가해 주세요
      </span>
    </div>
  ) : (
    <CustomSwiper
      slideItems={milestoneList.map((v) => ({
        key: v.milestoneId.toString(),
        components: (
          <MilestoneCard
            milestoneInfo={v}
            initActiveMilestoneId={initActiveMilestoneId}
            authMap={currentUserPMAuth!}
          />
        ),
      }))}
      initActiveSlideIndex={initActiveMilestoneIndex!}
    />
  );
}

export default Milestones;
