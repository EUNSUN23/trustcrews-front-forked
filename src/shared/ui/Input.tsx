'use client';

import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

const inputClassName = (disabled: boolean) =>
  clsx('relative mobile:text-sm', disabled && 'opacity-50 pointer-events-none');

const Input = ({
  id,
  label,
  disabled = false,
  required = false,
  ...props
}: InputProps) => {
  return (
    <div className={inputClassName(disabled)}>
      {label && (
        <label htmlFor={id} className='text-gray-700'>
          {label}
          {required && (
            <div
              aria-hidden={true}
              className='inline-block text-red-500 required-dot ml-1.5 align-middle'
            >
              *
            </div>
          )}
        </label>
      )}
      <input
        aria-required={required}
        id={id}
        type={props.type || 'text'}
        className='w-full py-2 px-4 flex-1 mobile:text-sm rounded-lg border-1 appearance-none border border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        {...props}
      />
      {props.title && (
        <p aria-hidden={true} className='py-1 text-sm text-gray-400'>
          {props.title}
        </p>
      )}
    </div>
  );
};

export default Input;
