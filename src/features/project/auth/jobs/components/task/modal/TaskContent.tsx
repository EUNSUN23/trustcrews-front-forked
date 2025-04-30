'use client';

import Input from '@/components/ui/form/Input';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/project/auth/jobs/store/TaskModalStateStore';
import { ChangeEvent } from 'react';

const INPUT_ID = 'taskContent';

type TaskContentProps = {
  modalType: TaskModalType;
};

const TaskContent = ({ modalType }: TaskContentProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [content, setContent] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'content' }),
  );

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className='flex space-x-10 mobile:space-x-6'>
      <label
        htmlFor={INPUT_ID}
        className='text-gray-700 font-semibold self-center'
      >
        제목
      </label>
      <div className='w-[250px] mobile:w-[220px]'>
        <Input
          id={INPUT_ID}
          placeholder='제목 입력'
          value={content}
          onChange={handleChangeContent}
          maxLength={20}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TaskContent;
