'use client';

import TaskContentDetailInput from '@/components/project/work/work/modal/taskContentDetail/TaskContentDetailInput';
import { useRecoilValue } from 'recoil';
import {
  taskModalContentDetailSelector,
  TaskModalType,
} from '@/store/project/task/TaskStateStore';
import _ from 'lodash';
import ToggleTaskContentDetailAddInput from '@/components/project/work/work/modal/taskContentDetail/ToggleTaskContentDetailAddInput';

function TaskContentDetail({ modalType }: { modalType: TaskModalType }) {
  const taskContentDetailMap = useRecoilValue(
    taskModalContentDetailSelector(modalType),
  );
  return (
    <div className='w-full flex-col pb-3'>
      <div className='w-full py-3 mobile:py-2 flex justify-center text-xl mobile:text-lg font-medium text-gray-700 bg-greyBlue/5 rounded-sm'>
        할 일
      </div>
      <ToggleTaskContentDetailAddInput modalType={modalType} />
      <div className='max-h-[150px] overflow-y-auto'>
        {_.isEmpty(taskContentDetailMap) ? (
          <div className='mt-3 flex items-center justify-center text-xl noData h-[100px]'>
            <span>데이터가 없습니다.</span>
          </div>
        ) : (
          Array.from(taskContentDetailMap.keys(), (idForEdit) => (
            <TaskContentDetailInput
              modalType={modalType}
              key={idForEdit}
              idForEdit={idForEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskContentDetail;
