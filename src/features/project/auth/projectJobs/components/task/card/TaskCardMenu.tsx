'use client';

import { Fragment, MouseEvent } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { IoEllipsisVertical } from '@react-icons/all-files/io5/IoEllipsisVertical';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSnackbar from '@/hooks/common/useSnackbar';
import { useDeleteTask } from '@/features/project/auth/jobs/service/task/deleteTask';
import {
  TaskModModalData,
  taskModModalDataStateStore,
  taskModModalStateStore,
} from '@/features/project/auth/jobs/store/TaskModalStateStore';
import { TaskItem } from '@/features/project/auth/jobs/types/task';
import { TASK_STATUS } from '@/features/project/auth/jobs/constants/task/taskStatus';
import { projectManageAuthStateStore } from '@/features/project/auth/global/store/ProjectManageAuthStateStore';
import { cva } from 'class-variance-authority';
import { bigIntToString } from '@/utils/common';

const CardMenuButtonVariants = cva(
  'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
  {
    variants: {
      variant: {
        default: 'text-gray-700',
        focus: 'bg-gray-100 text-gray-900',
      },
    },
  },
);

const cardMenuButtonClass = (focus: boolean) =>
  CardMenuButtonVariants({ variant: focus ? 'focus' : 'default' });

const {
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

type TaskCardMenuProps = {
  taskItem: TaskItem;
};

const TaskCardMenu = ({ taskItem }: TaskCardMenuProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { code: auth } = useRecoilValue(projectManageAuthStateStore);
  const {
    content,
    workId,
    startDate,
    endDate,
    progressStatus,
    assignedUser,
    contentDetail,
  } = taskItem;
  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: (res) => setSuccessSnackbar(res.message),
    onError: (res) => setErrorSnackbar(res.message),
  });

  const setTaskModalState = useSetRecoilState(taskModModalStateStore);
  const setTaskModalData = useSetRecoilState(taskModModalDataStateStore);

  const handleClickUpdateButton = (e: MouseEvent) => {
    e.preventDefault();
    const updateForm: TaskModModalData = {
      content,
      progressStatus: progressStatus.code,
      startDate,
      endDate,
      assignedUserId: bigIntToString(assignedUser?.projectMemberId),
      contentDetail,
    };

    setTaskModalState((prev) => ({
      ...prev,
      isOpen: true,
      workId: bigIntToString(workId),
      auth,
    }));
    setTaskModalData(updateForm);
  };

  const handleClickDeleteButton = (e: MouseEvent) => {
    e.preventDefault();
    if (confirm('업무를 삭제하시겠습니까?')) {
      deleteTask({ workId, auth });
    }
  };

  return (
    <Menu as='div' className='relative flex-shrink-0 text-center'>
      <div>
        <MenuButton className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-500 hover:text-gray-600 focus:outline-none'>
          <span className='sr-only'>업무 메뉴</span>
          <IoEllipsisVertical className='h-5 w-5' aria-hidden='true' />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems className='absolute right-2 z-10 mt-1 tablet:min-w-[60px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1 '>
            {progressStatus.code !== TASK_COMPLETE && (
              <MenuItem>
                {({ focus }) => (
                  <a
                    href='#'
                    onClick={handleClickUpdateButton}
                    className={cardMenuButtonClass(focus)}
                  >
                    수정
                  </a>
                )}
              </MenuItem>
            )}
            <MenuItem>
              {({ focus }) => (
                <a
                  href='#'
                  onClick={handleClickDeleteButton}
                  className={cardMenuButtonClass(focus)}
                >
                  삭제
                </a>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default TaskCardMenu;
