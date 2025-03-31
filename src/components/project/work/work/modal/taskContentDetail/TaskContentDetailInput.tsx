'use client';

import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  taskContentDetailFieldSelector,
  taskModalContentDetailSelector,
  taskModalEditDisabledSelector,
} from '@/store/project/task/TaskStateStore';
import TaskContentCancelDeleteButton from '@/components/project/work/work/modal/taskContentDetail/TaskContentCancelDeleteButton';
import TaskContentEditFinishButton from '@/components/project/work/work/modal/taskContentDetail/TaskContentEditFinishButton';
import { TaskContentDetails } from '@/app/project/@task/_utils/type';

function TaskContentDetailInput({
  idForEdit,
  modalType,
}: {
  idForEdit: string;
  modalType: 'add' | 'mod';
}) {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [placeholder, setPlaceholder] = useState('할 일 입력');
  const [taskContentDetailField, setTaskContentDetailField] = useRecoilState(
    taskContentDetailFieldSelector({ modalType, idForEdit }),
  );
  const [value, setValue] = useState(() => taskContentDetailField);
  const setTaskContentDetails = useSetRecoilState(
    taskModalContentDetailSelector(modalType),
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 수정 모드 click
   */
  function onClickEditModeButtonHandler() {
    setIsReadOnly(false);
    inputRef.current?.focus();
  }

  /**
   * 수정 완료 click
   */
  function onClickEditFinishHandler() {
    setTaskContentDetailField(value);
    setIsReadOnly(true);
  }

  /**
   * 삭제 버튼 click
   */
  function onClickDeleteButtonHandler() {
    setTaskContentDetails((prev: TaskContentDetails) => {
      const updatedContentDetails = new Map(prev);
      updatedContentDetails.delete(idForEdit);
      return updatedContentDetails;
    });

    setIsReadOnly(true);
  }

  /**
   * 수정 취소 버튼 click
   */
  function onClickEditCancelButtonHandler() {
    setValue(taskContentDetailField);
    setIsReadOnly(true);
  }

  return (
    <div className={`w-full my-1 flex items-center relative`}>
      <div className='w-full flex items-center p-1 '>
        <div
          className={`relative ml-1 min-h-[2.3rem] mobile:min-h-[2rem] ${value === '' && 'min-w-[6.8rem]'}`}
        >
          <div className='relative flex items-center space-x-1 z-10'>
            <div
              className={`w-[320px] mobile:w-[210px] h-full whitespace-nowrap text-transparent`}
            >
              {value}
            </div>
          </div>
          <input
            ref={inputRef}
            type='text'
            placeholder={placeholder}
            className={`w-[320px] mobile:w-full h-full absolute top-0 left-0 z-10 appearance-none border-none focus:border-transparent 
                            focus:ring-0 focus:outline-none ${!isReadOnly && 'hoverColorChange-ground200'} ${disabled && 'text-gray-400'} `}
            onChange={(e) => {
              if (e.target.value === '') {
                setPlaceholder('할 일 입력');
              }
              setValue(e.target.value);
            }}
            value={value}
            maxLength={30}
            readOnly={isReadOnly}
          />
        </div>
      </div>
      <div
        className={`w-full flex space-x-3 mx-1 text-3xl text-neutral-dark z-10`}
      >
        <TaskContentEditFinishButton
          disabled={disabled}
          mode={isReadOnly ? 'edit' : 'finish'}
          onClickHandler={
            isReadOnly ? onClickEditModeButtonHandler : onClickEditFinishHandler
          }
        />
        <TaskContentCancelDeleteButton
          disabled={disabled}
          mode={isReadOnly ? 'delete' : 'cancel'}
          onClickHandler={
            isReadOnly
              ? onClickDeleteButtonHandler
              : onClickEditCancelButtonHandler
          }
        />
      </div>
    </div>
  );
}

export default TaskContentDetailInput;
