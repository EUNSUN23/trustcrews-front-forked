import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { SelectItem, SelectProps } from '@/utils/type';
import { classNames } from '@/utils/common';

export default function Select<T, V>({
  value,
  setValue,
  items = [],
  label,
  placeholder = '',
  required = false,
}: SelectProps<T, V>) {
  const compareItems = (a: SelectItem<T, V>, b: SelectItem<T, V>) => {
    if (a && b) {
      return a?.value === b?.value;
    }

    return false;
  };

  return (
    <Listbox value={value} onChange={setValue} by={compareItems}>
      {({ open }) => (
        <div>
          <Listbox.Label className='block text-gray-700 mobile:text-sm'>
            {label}
            {required ? (
              <span className='text-red-500 required-dot ml-1.5 align-middle'>
                *
              </span>
            ) : (
              <></>
            )}
          </Listbox.Label>
          <div className='relative'>
            <Listbox.Button className='w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
              <span
                className={classNames(
                  value ? '' : 'text-greyUnselect',
                  'block truncate',
                )}
              >
                {value ? (value.name as string) : placeholder}
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
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {items.map((item) => (
                  <Listbox.Option
                    key={item.value as string}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'bg-primary opacity-50 text-white'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm',
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-bold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {item.name as string}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
