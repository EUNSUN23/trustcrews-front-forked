'use client';

import Button from '@/shared/ui/Button';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { taskAddModalStateStore } from '@/features/project/auth/projectJobs/store/TaskModalStateStore';
import { activeMilestoneStateStore } from '@/features/project/auth/projectJobs/store/ActiveMilestoneStateStore';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';

const TaskAddButton = () => {
  const projectId = useRecoilValue(projectIdState);
  const { milestoneId } = useRecoilValue(activeMilestoneStateStore);
  const setTaskModalState = useSetRecoilState(taskAddModalStateStore);

  const handleClickAddButton = () => {
    setTaskModalState((prev) => ({
      ...prev,
      isOpen: true,
      projectId,
      milestoneId,
    }));
  };

  return (
    <Button size='md' onClick={handleClickAddButton}>
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        업무 추가
      </span>
    </Button>
  );
};

export default TaskAddButton;
