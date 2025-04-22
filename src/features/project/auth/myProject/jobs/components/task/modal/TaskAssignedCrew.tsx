import ProjectCrewSelect from '@/components/project/ProjectCrewSelect';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  TaskAddModalField,
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
  TaskModModalField,
} from '@/features/project/auth/myProject/jobs/store/TaskModalStateStore';

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

  const selectedAssignedUserId =
    modalType === 'add'
      ? (assignedUserId as TaskAddModalField<'assignedUserId'>)
      : (assignedUserId as TaskModModalField<'assignedUserId'>);

  return (
    <div className='flex mobile:space-x-6'>
      <label
        htmlFor='content'
        className='text-gray-700 font-semibold self-center'
      >
        담당
      </label>
      <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
        <ProjectCrewSelect
          disabled={disabled}
          assignedUserId={selectedAssignedUserId}
          setAssignedUserId={setAssignedUserId}
        />
      </div>
    </div>
  );
};

export default TaskAssignedCrew;
