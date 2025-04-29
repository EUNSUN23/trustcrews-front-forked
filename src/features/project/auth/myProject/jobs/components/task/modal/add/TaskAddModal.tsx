import { useRecoilValue, useResetRecoilState } from 'recoil';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import TaskDate from '@/features/project/auth/myProject/jobs/components/task/modal/TaskDate';
import TaskAssignedCrew from '@/features/project/auth/myProject/jobs/components/task/modal/TaskAssignedCrew';
import TaskContentDetail from '@/features/project/auth/myProject/jobs/components/task/modal/taskContentDetail/TaskContentDetail';
import TaskContent from '@/features/project/auth/myProject/jobs/components/task/modal/TaskContent';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';
import useCreateTask, {
  createTaskInputSchema,
} from '@/features/project/auth/myProject/jobs/service/task/createTask';
import {
  taskAddModalDataStateStore,
  taskAddModalStateStore,
  TaskModalType,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { numStrToBigInt } from '@/utils/common';

const modalType: TaskModalType = 'add';

const TaskAddModal = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title, projectId, milestoneId } = useRecoilValue(
    taskAddModalStateStore,
  );
  const [portalElement] = useModalPortalElement(isOpen);

  const addModalData = useRecoilValue(taskAddModalDataStateStore);
  const resetAddModalData = useResetRecoilState(taskAddModalDataStateStore);
  const resetAddModalState = useResetRecoilState(taskAddModalStateStore);

  const { mutate: createTask, isPending: isCreating } = useCreateTask(
    numStrToBigInt(projectId),
    numStrToBigInt(milestoneId),
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        resetAddModalData();
        resetAddModalState();
      },
      onError: (res) => {
        setErrorSnackbar(res.message);
      },
    },
  );

  const handleClickCloseButton = () => {
    resetAddModalData();
    resetAddModalState();
  };

  const handleClickConfirmButton = () => {
    const data = {
      content: addModalData.content,
      startDate: addModalData.startDate,
      endDate: addModalData.endDate,
      contentDetail: addModalData.contentDetail,
      assignedUserId: numStrToBigInt(addModalData.assignedUserId),
    };

    try {
      createTaskInputSchema.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    createTask(data);
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
              isUpdating={isCreating}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <TaskContent modalType={modalType} />
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

export default TaskAddModal;
