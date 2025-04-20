'use client';

import { Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { IoEllipsisVertical } from '@react-icons/all-files/io5/IoEllipsisVertical';
import { classNames } from '@/utils/common';
import { TaskItem } from '@/app/project/@task/_utils/type';
import { useSetRecoilState } from 'recoil';
import { TASK_STATUS } from '@/app/project/@task/_utils/constant';
import { ProjectAuthMap } from '@/utils/type';
import useSnackbar from '@/hooks/common/useSnackbar';
import { useDeleteTask } from '@/features/project/auth/myProject/jobs/service/task/deleteTask';
import {
  taskModModalDataStateStore,
  taskModModalStateStore,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { TaskModifyReqData } from '@/features/project/auth/myProject/jobs/service/task/updateTask';

function TaskCardMenu({
  taskItem,
  authMap,
}: {
  taskItem: TaskItem;
  authMap: ProjectAuthMap;
}) {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const {
    content,
    workId,
    startDate,
    endDate,
    progressStatus,
    milestoneId,
    projectId,
    assignedUser,
    contentDetail,
  } = taskItem;
  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: (res) => setSuccessSnackbar(res.message),
    onError: (res) => setErrorSnackbar(res.message),
  });

  const setTaskModalState = useSetRecoilState(taskModModalStateStore);
  const setTaskModalData = useSetRecoilState(taskModModalDataStateStore);

  function onClickUpdateHandler() {
    const updateForm: TaskModifyReqData = {
      // projectId,
      // milestoneId,
      content,
      progressStatus: progressStatus.code,
      startDate,
      endDate,
      assignedUserId: assignedUser!.projectMemberId,
      contentDetail,
      // workId,
      // authMap: authMap.code,
    };

    setTaskModalState((prev) => ({ ...prev, isOpen: true }));
    setTaskModalData(updateForm);
  }

  /**
   * 업무 삭제 click
   */
  function onClickDeleteCardHandler() {
    if (confirm('업무를 삭제하시겠습니까?')) {
      deleteTask({ workId, authMap: authMap.code });
    }
  }

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
            {progressStatus.code !== TASK_STATUS.PS003.code && (
              <MenuItem key='modify'>
                {({ focus }) => (
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      onClickUpdateHandler();
                    }}
                    className={classNames(
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                    )}
                  >
                    수정
                  </a>
                )}
              </MenuItem>
            )}
            <MenuItem key='delete'>
              {({ focus }) => (
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    onClickDeleteCardHandler();
                  }}
                  className={classNames(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                  )}
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
}

export default TaskCardMenu;
