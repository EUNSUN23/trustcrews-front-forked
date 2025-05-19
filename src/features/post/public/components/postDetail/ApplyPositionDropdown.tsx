import { Fragment } from 'react';
import useDropdownState from '@/shared/hooks/useDropdownState';
import { useRecoilState } from 'recoil';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { selectItemComparator } from '@/shared/utils/selectItemComparator';
import { clsx } from 'clsx';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import { DEFAULT_POSITION_OPTION } from '@/constants/defaultSelectOptions';
import { PostDetailData } from '@/service/post/public/getPostDetail';
import { projectApplyPositionState } from '@/features/post/public/store/ApplyPositionStateStore';

type ApplyPositionDropdownProps = {
  applyPositions: PostDetailData['postPositions'];
};

const ApplyPositionDropdown = ({
  applyPositions,
}: ApplyPositionDropdownProps) => {
  const { dropdownRef, openDropdown, setOpenDropdown } = useDropdownState();
  const [projectApplyPosition, setProjectApplyPosition] = useRecoilState(
    projectApplyPositionState,
  );

  const positionItems = [
    {
      ...DEFAULT_POSITION_OPTION,
      value: bigIntToString(DEFAULT_POSITION_OPTION.value),
    },
    ...applyPositions.map(({ position: { positionName, positionId } }) => ({
      name: positionName,
      value: bigIntToString(positionId),
    })),
  ];

  const selectedPosition = positionItems.find(
    (item) => item.value === bigIntToString(projectApplyPosition.value),
  )!;

  return (
    <Listbox
      aria-label='모집 포지션'
      value={selectedPosition}
      onChange={(item) =>
        setProjectApplyPosition({ ...item, value: numStrToBigInt(item.value) })
      }
      by={selectItemComparator}
    >
      <div
        ref={dropdownRef}
        className='relative z-10 self-center'
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <ListboxButton className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer'>
          <span className='text-base text-grey800 mobile:text-sm'>
            {selectedPosition.name}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <BsChevronDown
              aria-hidden='true'
              className='w-4 h-4 text-grey800'
            />
          </span>
        </ListboxButton>
        <Transition
          show={openDropdown}
          as={Fragment}
          leave='transition ease-in duration-10'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ListboxOptions className='absolute bottom-12 p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white'>
            {positionItems.map(({ name, value }) => (
              <ListboxOption
                key={`position-${value}`}
                className='p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer'
                value={{ name, value }}
              >
                {({ selected }) => (
                  <span
                    className={clsx(
                      'flex items-center space-x-2 truncate',
                      selected ? 'font-bold' : 'font-normal',
                    )}
                  >
                    {name}
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ApplyPositionDropdown;
