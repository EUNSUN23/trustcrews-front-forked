'use client';

import React from 'react';
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { useMediaQuery } from 'react-responsive';

interface Props {
  onClickHandler: () => void;
  mode: 'edit' | 'finish';
  disabled: boolean;
}

function TaskContentEditFinishButton({
  onClickHandler,
  mode,
  disabled,
}: Props) {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const iconSize = isMobile ? 18 : 23;

  return (
    <button
      type='button'
      onClick={() => onClickHandler()}
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
}

export default TaskContentEditFinishButton;
