'use client';

import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Listbox, Transition } from '@headlessui/react';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import Avatar from '@/components/ui/Avatar';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { useProjectCrewList } from '@/features/project/auth/projectCrews/service/getProjectCrewList';
import { compareItems } from '@/shared/utils/compareItems';
import { clsx } from 'clsx';
import { bigIntToString } from '@/shared/utils/stringUtils';

export const DEFAULT_CREW_OPTION = { name: '멤버 선택', value: '0' } as const;

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

type ProjectCrewSelectProps = {
  disabled: boolean;
  assignedUserId: string;
  setAssignedUserId: (id: string) => void;
};

const ProjectCrewSelect = ({
  disabled,
  assignedUserId,
  setAssignedUserId,
}: ProjectCrewSelectProps) => {
  const projectId = useRecoilValue(projectIdState)!;
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
    <Listbox
      value={selectedCrew}
      onChange={({ value }) => {
        setAssignedUserId(value);
      }}
      by={compareItems}
      disabled={disabled}
    >
      {({ open }) => (
        <div className='relative w-full tablet:w-[200px]'>
          <Listbox.Button className='w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
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
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-50 mt-1 max-h-[120px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {crewSelectItems.map(({ name, value }) => (
                <Listbox.Option
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default ProjectCrewSelect;
