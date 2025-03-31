import React, { ReactNode } from 'react';
import { classNames } from '@/utils/common';
import { Listbox } from '@headlessui/react';
import { SelectItem } from '@/utils/type';

function DefaultSelectOption<T extends ReactNode, V>({
  keyProps,
  selectItem,
}: {
  keyProps: string;
  selectItem: SelectItem<T, V>;
}) {
  return (
    <Listbox.Option
      key={keyProps}
      className={({ active }) =>
        classNames(
          active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm',
        )
      }
      value={selectItem}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              selected ? 'font-bold' : 'font-normal',
              'flex items-center space-x-2 block truncate',
            )}
          >
            <span>{selectItem.name}</span>
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
  );
}

export default DefaultSelectOption;
