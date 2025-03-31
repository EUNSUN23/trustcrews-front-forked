'use client';

import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line';
import { ImCancelCircle } from '@react-icons/all-files/im/ImCancelCircle';
import { useMediaQuery } from 'react-responsive';

interface Props {
  onClickHandler: () => void;
  mode: 'cancel' | 'delete';
  disabled: boolean;
}

function TaskContentCancelDeleteButton({
  onClickHandler,
  mode,
  disabled,
}: Props) {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const iconSize = isMobile ? 18 : 23;
  return (
    <button
      type='button'
      onClick={onClickHandler}
      disabled={disabled}
      className='disabled:text-gray-600/70'
    >
      {mode === 'delete' ? (
        <RiDeleteBin6Line size={iconSize} />
      ) : (
        <ImCancelCircle size={iconSize} className='text-gray-500' />
      )}
    </button>
  );
}

export default TaskContentCancelDeleteButton;
