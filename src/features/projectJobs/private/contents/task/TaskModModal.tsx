import { useRecoilValue, useResetRecoilState } from 'recoil';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import TaskSummaryControl from '@/features/projectJobs/private/components/task/form/TaskSummaryControl';
import TaskDateControl from '@/features/projectJobs/private/components/task/form/TaskDateControl';
import TaskAssignedCrewControl from '@/features/projectJobs/private/components/task/form/TaskAssignedCrewControl';
import {
  TaskModalType,
  TaskModForm,
  taskModFormStateStore,
  taskModModalStateStore,
} from '@/features/projectJobs/private/store/TaskModalStateStore';
import useUpdateTask, {
  updateTaskInputSchema,
} from '@/features/projectJobs/private/service/task/updateTask';
import { useCompleteTask } from '@/features/projectJobs/private/service/task/completeTask';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';
import { TASK_STATUS } from '@/features/projectJobs/private/constants/task/taskStatus';
import TaskTodoControl from '@/features/projectJobs/private/components/task/taskTodoControl';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import TaskProgressStatusControl from '@/features/projectJobs/private/components/task/form/TaskProgressStatusControl';

const modalType: TaskModalType = 'mod';

const {
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

const TaskModModal = () => {
  const resetTaskModModalState = useResetRecoilState(taskModModalStateStore);
  const resetTaskModModalData = useResetRecoilState(taskModFormStateStore);
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title, workId, auth } = useRecoilValue(
    taskModModalStateStore,
  );
  const [portalElement] = useModalPortalElement(isOpen);

  const modModalData = useRecoilValue(taskModFormStateStore);

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
      const data: TaskModForm = modModalData;

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
                  <TaskSummaryControl modalType={modalType} />
                  <TaskProgressStatusControl />
                  <TaskDateControl modalType={modalType} />
                  <TaskAssignedCrewControl modalType={modalType} />
                  <TaskTodoControl modalType={modalType} />
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
