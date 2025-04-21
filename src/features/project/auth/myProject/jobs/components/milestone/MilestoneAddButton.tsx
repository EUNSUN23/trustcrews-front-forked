'use client';

import Button from '@/components/ui/button';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useSetRecoilState } from 'recoil';
import { milestoneAddModalStateStore } from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';

const MilestoneAddButton = () => {
  const setMilestoneAddModalState = useSetRecoilState(
    milestoneAddModalStateStore,
  );

  const onClickHandler = () => {
    setMilestoneAddModalState((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <Button
      size='md'
      className='mb-4'
      onClickHandler={onClickHandler}
      aria-label='마일스톤 추가'
    >
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        마일스톤 추가
      </span>
    </Button>
  );
};

export default MilestoneAddButton;
