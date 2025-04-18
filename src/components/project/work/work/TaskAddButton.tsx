'use client';

import Button from '@/components/ui/button';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useSetRecoilState } from 'recoil';
import {
  taskAddModalStateStore,
  taskModalDataFieldSelector,
} from '@/features/project/auth/task/store/TaskModalStateStore';

type TaskAddButtonProps = {
  milestoneId: string | bigint;
  projectId: string | bigint;
};

function TaskAddButton({ milestoneId, projectId }: TaskAddButtonProps) {
  const setTaskModalState = useSetRecoilState(taskAddModalStateStore);
  const setTaskAddModalMilestoneId = useSetRecoilState(
    taskModalDataFieldSelector({
      modalType: 'add',
      fieldKey: 'milestoneId',
    }),
  );
  const setTaskAddModalProjectId = useSetRecoilState(
    taskModalDataFieldSelector({
      modalType: 'add',
      fieldKey: 'projectId',
    }),
  );

  function onClickHandler() {
    setTaskAddModalProjectId(projectId);
    setTaskAddModalMilestoneId(milestoneId);
    setTaskModalState((prev) => ({ ...prev, isOpen: true }));
  }

  return (
    <Button size='md' onClickHandler={() => onClickHandler()}>
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        업무 추가
      </span>
    </Button>
  );
}

export default TaskAddButton;
