import { useRecoilValue, useResetRecoilState } from 'recoil';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import TaskContent from '@/features/project/auth/projectJobs/components/task/modal/TaskContent';
import TaskDate from '@/features/project/auth/projectJobs/components/task/modal/TaskDate';
import TaskAssignedCrew from '@/features/project/auth/projectJobs/components/task/modal/TaskAssignedCrew';
import TaskContentDetail from '@/features/project/auth/projectJobs/components/task/modal/taskContentDetail/TaskContentDetail';
import TaskProgressStatus from '@/features/project/auth/projectJobs/components/task/modal/mod/TaskProgressStatus';
import {
  TaskModalType,
  TaskModModalData,
  taskModModalDataStateStore,
  taskModModalStateStore,
} from '@/features/project/auth/projectJobs/store/TaskModalStateStore';
import useUpdateTask, {
  updateTaskInputSchema,
} from '@/features/project/auth/projectJobs/service/task/updateTask';
import { useCompleteTask } from '@/features/project/auth/projectJobs/service/task/completeTask';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';
import { TASK_STATUS } from '@/features/project/auth/projectJobs/constants/task/taskStatus';
import { numStrToBigInt } from '@/utils/common';

const modalType: TaskModalType = 'mod';

const {
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

const TaskModModal = () => {
  const resetTaskModModalState = useResetRecoilState(taskModModalStateStore);
  const resetTaskModModalData = useResetRecoilState(taskModModalDataStateStore);
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title, workId, auth } = useRecoilValue(
    taskModModalStateStore,
  );
  const [portalElement] = useModalPortalElement(isOpen);

  const modModalData = useRecoilValue(taskModModalDataStateStore);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(
    numStrToBigInt(workId),
    auth,
    {
      onSuccess: (res) => {
        resetTaskModModalState();
        resetTaskModModalData();
        setSuccessSnackbar(res.message);
      },
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const { completeTask, isUpdating: isCompleting } = useCompleteTask(
    numStrToBigInt(workId),
    auth,
    {
      onSuccess: (res) => {
        resetTaskModModalState();
        resetTaskModModalData();
        setSuccessSnackbar(res.message);
      },
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickCloseButton = () => {
    resetTaskModModalState();
    resetTaskModModalData();
  };

  const handleClickConfirmButton = () => {
    if (modModalData.progressStatus === TASK_COMPLETE) {
      if (
        confirm(
          '업무 완료시 다른 수정사항은 반영되지 않습니다. 업무를 완료하시겠습니까?',
        )
      ) {
        completeTask();
      }
    } else {
      const data: TaskModModalData = modModalData;

      try {
        updateTaskInputSchema.parse(data);
      } catch (e: unknown) {
        setErrorSnackbar((e as ZodError).errors[0].message);
        return;
      }
      updateTask({
        ...modModalData,
        assignedUserId: numStrToBigInt(modModalData.assignedUserId),
      });
    }
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={handleClickCloseButton}
              title={title}
              onClickConfirmHandler={handleClickConfirmButton}
              isUpdating={isUpdating || isCompleting}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <TaskContent modalType={modalType} />
                  <TaskProgressStatus />
                  <TaskDate modalType={modalType} />
                  <TaskAssignedCrew modalType={modalType} />
                  <TaskContentDetail modalType={modalType} />
                </div>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default TaskModModal;
