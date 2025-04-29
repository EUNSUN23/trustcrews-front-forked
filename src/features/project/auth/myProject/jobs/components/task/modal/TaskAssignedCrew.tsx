import ProjectCrewSelect from '@/features/project/auth/myProject/jobs/components/ProjectCrewSelect';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';
import { Suspense } from 'react';
import SelectSkeleton from '@/components/ui/skeleton/SelectSkeleton';

type TaskAssignedCrewProps = {
  modalType: TaskModalType;
};

const TaskAssignedCrew = ({ modalType }: TaskAssignedCrewProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [assignedUserId, setAssignedUserId] = useRecoilState(
    taskModalDataFieldSelector({
      modalType,
      fieldKey: 'assignedUserId',
    }),
  );

  return (
    <div className='flex mobile:space-x-6'>
      <label
        htmlFor='content'
        className='text-gray-700 font-semibold self-center'
      >
        담당
      </label>
      <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
        <Suspense
          fallback={
            <SelectSkeleton
              label=''
              placeholder='담당 멤버'
              className='max-w-[150px]'
            />
          }
        >
          <ProjectCrewSelect
            disabled={disabled}
            assignedUserId={assignedUserId}
            setAssignedUserId={setAssignedUserId}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default TaskAssignedCrew;
