import TaskStatusSelector from '@/features/project/auth/myProject/jobs/components/task/modal/mod/TaskStatusSelector';
import { useRecoilValue } from 'recoil';
import TaskStatusBadge from '@/components/ui/badge/TaskStatusBadge';
import { taskProgressModFieldSelector } from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { TASK_STATUS } from '@/features/project/auth/myProject/jobs/constants/task/taskStatus';

const { PS001: TASK_PS001 } = TASK_STATUS;

const TaskProgressStatus = () => {
  const progressStatus = useRecoilValue(taskProgressModFieldSelector);

  return (
    <div className='flex'>
      <label className='text-gray-700 font-semibold self-center'>진행</label>
      <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
        {progressStatus === TASK_PS001.code ? (
          <TaskStatusBadge taskStatus={TASK_PS001.code}>
            {TASK_PS001.name}
          </TaskStatusBadge>
        ) : (
          <TaskStatusSelector />
        )}
      </div>
    </div>
  );
};

export default TaskProgressStatus;
