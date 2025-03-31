'use client';

import React from 'react';
import { IoIosAddCircle } from '@react-icons/all-files/io/IoIosAddCircle';

function TaskContentAddButton({
  onClickAddButtonHandler,
}: {
  onClickAddButtonHandler: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onClickAddButtonHandler}
      className='text-primary'
    >
      <IoIosAddCircle size={23} />
    </button>
  );
}

export default TaskContentAddButton;
