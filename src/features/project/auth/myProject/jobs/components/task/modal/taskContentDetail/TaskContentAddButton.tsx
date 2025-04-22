'use client';

import { IoIosAddCircle } from '@react-icons/all-files/io/IoIosAddCircle';

type TaskContentAddButtonProps = {
  onClickAddButton: () => void;
};

const TaskContentAddButton = ({
  onClickAddButton,
}: TaskContentAddButtonProps) => {
  return (
    <button type='button' onClick={onClickAddButton} className='text-primary'>
      <IoIosAddCircle size={23} />
    </button>
  );
};

export default TaskContentAddButton;
