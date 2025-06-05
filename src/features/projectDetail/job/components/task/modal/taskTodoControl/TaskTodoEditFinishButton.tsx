'use client';

import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import useMobileMediaQuery from '@/hooks/mediaQuery/useMobileMediaQuery';

type TaskContentEditFinishButtonProps = {
  onClick: () => void;
  mode: 'edit' | 'finish';
  disabled: boolean;
};

const TaskTodoEditFinishButton = ({
  onClick,
  mode,
  disabled,
}: TaskContentEditFinishButtonProps) => {
  const isMobile = useMobileMediaQuery();
  const iconSize = isMobile ? 18 : 23;

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='disabled:text-gray-600/70'
    >
      {mode === 'edit' ? (
        <MdModeEdit size={iconSize} />
      ) : (
        <FaCheck size={iconSize} className='text-primary' />
      )}
    </button>
  );
};

export default TaskTodoEditFinishButton;
