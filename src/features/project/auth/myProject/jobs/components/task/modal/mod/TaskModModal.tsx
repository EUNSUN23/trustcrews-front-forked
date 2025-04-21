import { useRecoilValue, useResetRecoilState } from 'recoil';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import TaskContent from '@/features/project/auth/myProject/jobs/components/task/modal/TaskContent';
import TaskDate from '@/features/project/auth/myProject/jobs/components/task/modal/TaskDate';
import TaskAssignedCrew from '@/features/project/auth/myProject/jobs/components/task/modal/TaskAssignedCrew';
import TaskContentDetail from '@/features/project/auth/myProject/jobs/components/task/modal/taskContentDetail/TaskContentDetail';
import TaskProgressStatus from '@/features/project/auth/myProject/jobs/components/task/modal/mod/TaskProgressStatus';
import {
  TaskModalType,
  taskModModalDataStateStore,
  taskModModalStateStore,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import useUpdateTask, {
  UpdateTaskInput,
  updateTaskInputSchema,
} from '@/features/project/auth/myProject/jobs/service/task/updateTask';
import { useCompleteTask } from '@/features/project/auth/myProject/jobs/service/task/completeTask';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';
import { TASK_STATUS } from '@/features/project/auth/myProject/jobs/constants/task/taskStatus';

const modalType: TaskModalType = 'mod';

const {
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

const TaskModModal = () => {
  const { setErrorSnackbar } = useSnackbar();
  const { isOpen, title } = useRecoilValue(taskModModalStateStore);
  const [portalElement] = useModalPortalElement(isOpen);

  const modModalData = useRecoilValue(taskModModalDataStateStore);
  const resetModModalState = useResetRecoilState(taskModModalStateStore);
  const resetModModalData = useResetRecoilState(taskModModalDataStateStore);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const { completeTask, isUpdating: isCompleting } = useCompleteTask();

  function onCloseHandler() {
    resetModModalData();
    resetModModalState();
  }

  function onConfirmHandler() {
    if (modModalData.progressStatus === TASK_COMPLETE) {
      if (
        confirm(
          '업무 완료시 다른 수정사항은 반영되지 않습니다. 업무를 완료하시겠습니까?',
        )
      ) {
        completeTask({
          workId: modModalData.workId,
          authMap: modModalData.authMap,
        });
      }
    } else {
      const data: UpdateTaskInput = modModalData;

      try {
        updateTaskInputSchema.parse(data);
      } catch (e: unknown) {
        setErrorSnackbar((e as ZodError).errors[0].message);
        return;
      }

      updateTask(modModalData);
    }
  }

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={() => onCloseHandler()}
              title={title}
              onClickConfirmHandler={() => onConfirmHandler()}
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
