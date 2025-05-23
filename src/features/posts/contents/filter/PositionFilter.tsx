import { Fragment, useEffect, useTransition } from 'react';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import useDropdownState from '@/shared/hooks/useDropdownState';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { selectedPositionState } from '@/store/posts/PostSearchStateStore';
import { selectItemComparator } from '@/shared/utils/selectItemComparator';
import { clsx } from 'clsx';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { usePositionList } from '@/features/position/api/getPositionList';
import { DEFAULT_POSITION_OPTION } from '@/features/position/constants/defaultPositionOption';

const PositionFilter = () => {
  const [_, startTransition] = useTransition();
  const resetSelectedPosition = useResetRecoilState(selectedPositionState);
  const [selectedPosition, setSelectedPosition] = useRecoilState(
    selectedPositionState,
  );

  useEffect(() => {
    resetSelectedPosition();
  }, [resetSelectedPosition]);

  const { dropdownRef, openDropdown, setOpenDropdown } = useDropdownState();

  const handleClickPositionDropdownButton = () => {
    setOpenDropdown((prev) => !prev);
  };

  const handleChangePosition = (item: { name: string; value: string }) => {
    startTransition(() => setSelectedPosition(item));
  };

  const { data: positions } = usePositionList();

  const positionItems = [
    DEFAULT_POSITION_OPTION,
    ...positions.data.map(({ positionId, positionName }) => ({
      name: positionName,
      value: bigIntToString(positionId),
    })),
  ];

  const selected =
    positionItems.find((item) => item.value === selectedPosition.value) ||
    DEFAULT_POSITION_OPTION;

  return (
    <Listbox
      aria-label='모집 포지션'
      value={selected}
      onChange={handleChangePosition}
      by={selectItemComparator}
    >
      <div
        ref={dropdownRef}
        className='relative z-10 self-center'
        onClick={handleClickPositionDropdownButton}
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

export default PositionFilter;
