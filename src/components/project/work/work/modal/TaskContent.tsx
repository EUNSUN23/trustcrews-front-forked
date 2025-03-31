'use client';
import React from 'react';
import Input from '@/components/ui/form/Input';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  TaskAddModalField,
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
  TaskModModalField,
} from '@/store/project/task/TaskStateStore';

type TaskContentProps = {
  modalType: TaskModalType;
};

function TaskContent({ modalType }: TaskContentProps) {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [content, setContent] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'content' }),
  );

  const value =
    modalType === 'add'
      ? (content as TaskAddModalField<'content'>)
      : (content as TaskModModalField<'content'>);

  return (
    <div className='flex space-x-10 mobile:space-x-6'>
      <label
        htmlFor='content'
        className='text-gray-700 font-semibold self-center'
      >
        제목
      </label>
      <div className='w-[250px] mobile:w-[220px]'>
        <Input
          id='content'
          placeholder='제목 입력'
          value={value}
          onChange={(e) => setContent(e.target.value)}
          maxLength={20}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default TaskContent;
