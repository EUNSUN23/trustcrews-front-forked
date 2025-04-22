import { useState } from 'react';
import { RiAddLine } from '@react-icons/all-files/ri/RiAddLine';
import TaskContentDetailAddInput from '@/features/project/auth/myProject/jobs/components/task/modal/taskContentDetail/TaskContentDetailAddInput';
import { useRecoilValue } from 'recoil';
import {
  taskModalContentDetailSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { MAX_TASK_CONTENT_DETAIL } from '@/features/project/auth/myProject/jobs/constants/task/maxTaskContentDetail';
import useSnackbar from '@/hooks/common/useSnackbar';

type ToggleTaskContentDetailAddInputProps = {
  modalType: TaskModalType;
};

const ToggleTaskContentDetailAddInput = ({
  modalType,
}: ToggleTaskContentDetailAddInputProps) => {
  const { setInfoSnackbar } = useSnackbar();
  const [showAddElement, setShowAddElement] = useState(false);
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const taskContentDetailMap = useRecoilValue(
    taskModalContentDetailSelector(modalType),
  );

  const handleClickAddButton = () => {
    if (taskContentDetailMap.size >= MAX_TASK_CONTENT_DETAIL) {
      setInfoSnackbar('할 일은 업무당 최대 5개 추가할 수 있습니다.');
      return;
    }
    setShowAddElement((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleClickAddButton}
        className={`group w-full flex items-center space-x-1 py-2 px-1 text-lg mobile:text-base text-gray-600 leading-[2.15rem] font-semibold ${showAddElement && 'bg-gray-50'} disabled:text-gray-600/70`}
        disabled={disabled}
      >
        <RiAddLine />
        <span>추가</span>
        <span className='text-sm mobile:text-xs text-gray-500 group-disabled:text-gray-500/70'>
          (최대 5개)
        </span>
      </button>
      {showAddElement && (
        <TaskContentDetailAddInput
          setIsOpen={setShowAddElement}
          modalType={modalType}
        />
      )}
    </>
  );
};

export default ToggleTaskContentDetailAddInput;
