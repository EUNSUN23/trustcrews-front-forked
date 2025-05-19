'use client';

import { useRecoilValue } from 'recoil';
import _ from 'lodash';
import {
  TaskModalType,
  taskTodoSelector,
} from '@/features/project/auth/projectJobs/store/TaskModalStateStore';
import AddTaskTodoToggle from '@/features/project/auth/projectJobs/components/form/taskTodo/AddTaskTodoToggle';
import TaskTodoModInput from '@/features/project/auth/projectJobs/components/form/taskTodo/TaskTodoModInput';

type TaskTodoProps = {
  modalType: TaskModalType;
};

const TaskTodo = ({ modalType }: TaskTodoProps) => {
  const taskTodos = useRecoilValue(taskTodoSelector(modalType));

  return (
    <div className='w-full flex-col pb-3'>
      <div className='w-full py-3 mobile:py-2 flex justify-center text-xl mobile:text-lg font-medium text-gray-700 bg-greyBlue/5 rounded-sm'>
        할 일
      </div>
      <AddTaskTodoToggle modalType={modalType} />
      <div className='max-h-[150px] overflow-y-auto'>
        {_.isEmpty(taskTodos) ? (
          <div className='mt-3 flex items-center justify-center text-xl noData h-[100px]'>
            <span>데이터가 없습니다.</span>
          </div>
        ) : (
          Array.from(taskTodos.keys(), (idForEdit) => (
            <TaskTodoModInput
              modalType={modalType}
              key={idForEdit}
              idForEdit={idForEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskTodo;
