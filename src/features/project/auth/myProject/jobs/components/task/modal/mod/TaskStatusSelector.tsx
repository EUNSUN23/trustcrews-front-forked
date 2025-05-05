import { useRecoilState } from 'recoil';
import { Switch } from '@headlessui/react';
import { taskProgressModFieldSelector } from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { TaskStatusCode } from '@/features/project/auth/myProject/jobs/types/task';
import { TASK_STATUS } from '@/features/project/auth/myProject/jobs/constants/task/taskStatus';

const {
  PS002: { code: TASK_PROCESSING },
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

const TaskStatusSelector = () => {
  const [progressStatusCode, setProgressStatus] = useRecoilState(
    taskProgressModFieldSelector,
  );

  const handleToggleSwitch = () => {
    setProgressStatus((prev) =>
      prev === TASK_COMPLETE ? TASK_PROCESSING : TASK_COMPLETE,
    );
  };

  return (
    <Switch
      checked={progressStatusCode === TASK_COMPLETE}
      onChange={handleToggleSwitch}
      className='group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-amber-200/50 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-none  data-[headlessui-state=checked]:bg-gray-200'
    >
      <span className='sr-only'>
        {TASK_STATUS[progressStatusCode as TaskStatusCode].name}
      </span>
      <span className='pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[headlessui-state=checked]:translate-x-5'>
        <span
          aria-hidden='true'
          className='absolute left-[50px] flex h-full w-[60px] items-center justify-center transition-opacity duration-50 ease-in leading-none text-[#785C03] group-data-[headlessui-state=checked]:opacity-0 group-data-[headlessui-state=checked]:duration-50 group-data-[headlessui-state=checked]:ease-out'
        >
          진행중
        </span>
        <span
          aria-hidden='true'
          className='absolute left-[25px] flex h-full w-[60px] items-center justify-center opacity-0 transition-opacity duration-50 ease-out leading-none text-greyDarkblue group-data-[headlessui-state=checked]:opacity-100 group-data-[headlessui-state=checked]:duration-50 group-data-[headlessui-state=checked]:ease-in'
        >
          완료
        </span>
      </span>
    </Switch>
  );
};

export default TaskStatusSelector;
