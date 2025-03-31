import React from 'react';
import TaskStatusSelector from '@/components/project/work/work/modal/mod/TaskStatusSelector';
import { useRecoilValue } from 'recoil';
import { taskProgressModFieldSelector } from '@/store/project/task/TaskStateStore';
import { TASK_STATUS } from '@/app/project/@task/_utils/constant';
import TaskStatusBadge from '@/components/ui/badge/TaskStatusBadge';

function TaskProgressStatus() {
  const progressStatus = useRecoilValue(taskProgressModFieldSelector);

  return (
    <div className='flex'>
      <label className='text-gray-700 font-semibold self-center'>진행</label>
      <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
        {progressStatus === TASK_STATUS.PS001.code ? (
          <TaskStatusBadge size='sm' text={TASK_STATUS.PS001.name} />
        ) : (
          <TaskStatusSelector />
        )}
      </div>
    </div>
  );
}

export default TaskProgressStatus;
