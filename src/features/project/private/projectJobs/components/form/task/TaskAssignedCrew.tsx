import ProjectCrewSelect from '@/features/project/auth/projectJobs/components/form/task/ProjectCrewSelect';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskFormFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/project/auth/projectJobs/store/TaskModalStateStore';
import { Suspense } from 'react';
import SelectSkeleton from '@/components/skeleton/SelectSkeleton';
import { Field, Label } from '@headlessui/react';

type TaskAssignedCrewProps = {
  modalType: TaskModalType;
};

const TaskAssignedCrew = ({ modalType }: TaskAssignedCrewProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [assignedUserId, setAssignedUserId] = useRecoilState(
    taskFormFieldSelector({
      modalType,
      fieldKey: 'assignedUserId',
    }),
  );

  return (
    <Field className='flex mobile:space-x-6'>
      <Label className='text-gray-700 font-semibold self-center'>담당</Label>
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
    </Field>
  );
};

export default TaskAssignedCrew;
