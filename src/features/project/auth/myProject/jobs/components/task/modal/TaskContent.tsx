'use client';

import Input from '@/components/ui/form/Input';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  TaskAddModalField,
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
  TaskModModalField,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { ChangeEvent } from 'react';

type TaskContentProps = {
  modalType: TaskModalType;
};

const TaskContent = ({ modalType }: TaskContentProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [content, setContent] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'content' }),
  );

  const value =
    modalType === 'add'
      ? (content as TaskAddModalField<'content'>)
      : (content as TaskModModalField<'content'>);

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

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
          onChange={handleChangeContent}
          maxLength={20}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TaskContent;
