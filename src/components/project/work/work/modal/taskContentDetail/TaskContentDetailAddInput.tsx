'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import TaskContentAddButton from '@/components/project/work/work/modal/taskContentDetail/TaskContentAddButton';
import { v4 } from 'uuid';
import {
  taskContentDetailFieldSelector,
  TaskModalType,
} from '@/features/project/auth/task/store/TaskModalStateStore';

function TaskContentDetailAddInput({
  setIsOpen,
  modalType,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalType: TaskModalType;
}) {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('할 일 입력');
  const idForEdit = useRef(v4());
  const setTaskContentDetailField = useSetRecoilState(
    taskContentDetailFieldSelector({
      modalType,
      idForEdit: idForEdit.current,
    }),
  );

  function onClickAddButtonHandler() {
    setTaskContentDetailField(value);
    setValue('');
    setIsOpen(false);
  }

  return (
    <div className='my-2 flex items-center'>
      <div className='w-full flex items-center p-1'>
        <div
          className={`relative ml-1 min-h-[2.3rem] mobile:min-h-[2rem] ${value.length === 0 && 'min-w-[6.8rem]'}`}
        >
          <div className='relative flex items-center space-x-1 z-10'>
            <div className='w-[320px] mobile:w-[240px] whitespace-nowrap text-transparent'>
              {value}
            </div>
          </div>
          <input
            type='text'
            placeholder={placeholder}
            className='h-full w-[320px] mobile:w-full absolute top-0 left-0 z-10 text-greyBlue hoverColorChange-ground200
                         appearance-none border-none focus:outline-none focus:border-none focus:ring-0'
            onChange={(e) => {
              if (e.target.value === '') setPlaceholder('할 일 입력');
              setValue(e.target.value);
            }}
            spellCheck={false}
            value={value}
            maxLength={30}
            readOnly={false}
          />
        </div>
      </div>
      <div className={`w-full opacity-100 flex space-x-1 mx-1`}>
        <TaskContentAddButton
          onClickAddButtonHandler={onClickAddButtonHandler}
        />
      </div>
    </div>
  );
}

export default TaskContentDetailAddInput;
