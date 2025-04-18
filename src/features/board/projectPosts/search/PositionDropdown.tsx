import { Fragment } from 'react';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import useDropdownState from '@/hooks/common/useDropdownState';
import { usePositionList } from '@/hooks/common/usePositionList';
import { useRecoilState } from 'recoil';
import { compareItems } from '@/app/_boardUtil/common';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { bigIntToString, classNames, numStrToBigInt } from '@/utils/common';
import { selectedPositionState } from '@/features/board/projectPosts/store/PostSearchStateStore';
import { DEFAULT_POSITION_OPTION } from '@/utils/constant';

function PositionDropdown() {
  const [selectedPosition, setSelectedPosition] = useRecoilState(
    selectedPositionState,
  );
  const { dropdownRef, openDropdown, setOpenDropdown } = useDropdownState();

  const { data: positions, isFetching } = usePositionList();

  if (isFetching)
    return (
      <div className='relative z-10 self-center'>
        <div className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer bg-gray-300 animate-pulse'>
          <div className='text-base text-grey800 mobile:text-sm'>
            {'포지션'}
          </div>
          <BsChevronDown className='w-4 h-4 text-grey800' />
        </div>
      </div>
    );

  const positionItems = [
    {
      ...DEFAULT_POSITION_OPTION,
      value: bigIntToString(DEFAULT_POSITION_OPTION.value),
    },
    ...positions!.data!.map(({ positionId, positionName }) => ({
      name: positionName,
      value: bigIntToString(positionId),
    })),
  ];

  const selected = positionItems.find(
    (item) => item.value === bigIntToString(selectedPosition.value),
  )!;

  return (
    <Listbox
      aria-label='모집 포지션'
      value={selected}
      onChange={(item) =>
        setSelectedPosition({ ...item, value: numStrToBigInt(item.value) })
      }
      by={compareItems}
    >
      <div
        ref={dropdownRef}
        className='relative z-10 self-center'
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <ListboxButton className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer'>
          <span className='text-base text-grey800 mobile:text-sm'>
            {selected.name}
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
          <ListboxOptions className='absolute top-12 p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white'>
            {positionItems.map(({ name, value }) => (
              <ListboxOption
                key={`position-${value}`}
                className='p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer'
                value={{ name, value }}
              >
                {({ selected }) => (
                  <span
                    className={classNames(
                      selected ? 'font-bold' : 'font-normal',
                      'flex items-center space-x-2 truncate',
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
}

export default PositionDropdown;
