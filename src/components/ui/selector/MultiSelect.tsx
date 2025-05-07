import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { compareItems } from '@/shared/utils/compareItems';
import { clsx } from 'clsx';
import { SelectItem } from '@/shared/types/ui';

type MultiSelectProps<T, V> = {
  items: readonly SelectItem<T, V>[];
  values: readonly SelectItem<T, V>[];
  setValues: (value: readonly SelectItem<T, V>[]) => void;
  value?: SelectItem<T, V> | null;
  setValue?: (value: SelectItem<T, V>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const MultiSelect = <T, V>({
  values,
  setValues,
  items = [],
  label,
  placeholder = '',
  required = false,
}: MultiSelectProps<T, V>) => {
  return (
    <Listbox value={values} onChange={setValues} by={compareItems} multiple>
      {({ open }) => (
        <div>
          {label && (
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
          )}
          <div className='relative '>
            <Listbox.Button className='w-full min-h-[42px] py-2 pl-4 pr-10 flex-1 appearance-none mobile:text-sm cursor-default rounded-lg border-1 border text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
              <span
                className={clsx(
                  'block truncate',
                  values.length > 0 ? '' : 'text-greyUnselect',
                )}
              >
                {values.length > 0
                  ? values.map((value) => value.name).join(', ')
                  : placeholder}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <AiFillCaretDown
                  aria-hidden='true'
                  className='w-5 text-gray-400'
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
                    className={({ focus }) =>
                      clsx(
                        'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm',
                        focus
                          ? 'bg-primary opacity-50 text-white'
                          : 'text-gray-900',
                      )
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-bold' : 'font-normal',
                          )}
                        >
                          {item.name as string}
                        </span>
                        {selected ? (
                          <span
                            className={clsx(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              focus ? 'text-white' : 'text-primary',
                            )}
                          >
                            <AiOutlineCheck
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </span>
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
};

export default MultiSelect;
