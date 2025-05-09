import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskFormFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/projectJobs/private/store/TaskModalStateStore';
import { Fragment, Suspense } from 'react';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { useProjectCrewList } from '@/features/projectCrews/private/service/getProjectCrewList';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { selectItemComparator } from '@/shared/utils/selectItemComparator';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { clsx } from 'clsx';
import Avatar from '@/shared/ui/Avatar';
import { DEFAULT_CREW_OPTION } from '@/constants/defaultSelectOptions';

const selectButtonTextClass = ({
  defaultSelected,
  disabled,
}: {
  defaultSelected: boolean;
  disabled: boolean;
}) =>
  clsx(
    'block truncate',
    defaultSelected && 'text-greyUnselect',
    disabled && 'text-gray-700/60',
  );

type TaskAssignedCrewProps = {
  modalType: TaskModalType;
};

const TaskAssignedCrewControl = ({ modalType }: TaskAssignedCrewProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [assignedUserId, setAssignedUserId] = useRecoilState(
    taskFormFieldSelector({
      modalType,
      fieldKey: 'assignedUserId',
    }),
  );

  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { projectMembers: crewList },
    },
  } = useProjectCrewList(projectId);

  const crewProfileImgSrcList = crewList.map((crew) => ({
    profileImgSrc: crew.user.profileImgSrc,
    projectMemberId: bigIntToString(crew.projectMemberId),
  }));

  const crewSelectItems = [
    DEFAULT_CREW_OPTION,
    ...crewList.map((crew) => ({
      name: crew.user.nickname,
      value: bigIntToString(crew.projectMemberId),
    })),
  ];

  const selectedCrew = crewSelectItems.find(
    (item) => item.value === assignedUserId,
  )!;

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
          <Listbox
            value={selectedCrew}
            onChange={({ value }) => {
              setAssignedUserId(value);
            }}
            by={selectItemComparator}
            disabled={disabled}
          >
            {({ open }) => (
              <div className='relative w-full tablet:w-[200px]'>
                <ListboxButton className='w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
                  <span
                    className={selectButtonTextClass({
                      defaultSelected: !selectedCrew,
                      disabled,
                    })}
                  >
                    {selectedCrew.name}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <AiFillCaretDown
                      className='w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </ListboxButton>
                <Transition
                  show={open}
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <ListboxOptions className='absolute z-50 mt-1 max-h-[120px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {crewSelectItems.map(({ name, value }) => (
                      <ListboxOption
                        key={`key-${value}`}
                        className={({ focus }) =>
                          clsx(
                            'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm',
                            focus
                              ? 'bg-primary opacity-50 text-white'
                              : 'text-gray-900',
                          )
                        }
                        value={{ name, value }}
                      >
                        {({ selected, focus }) => (
                          <>
                            <span
                              className={clsx(
                                'block items-center space-x-2 truncate',
                                selected ? 'font-bold' : 'font-normal',
                              )}
                            >
                              {value !== '0' && (
                                <Avatar
                                  src={
                                    crewProfileImgSrcList.find(
                                      (v) => v.projectMemberId === value,
                                    )!.profileImgSrc
                                  }
                                  alt={`${name}의 프로필 이미지`}
                                  size='xxs'
                                />
                              )}
                              <span>{name}</span>
                            </span>
                            {selected && (
                              <span
                                className={clsx(
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                  focus ? 'text-white' : 'text-primary',
                                )}
                              ></span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox>
        </Suspense>
      </div>
    </Field>
  );
};

export default TaskAssignedCrewControl;
