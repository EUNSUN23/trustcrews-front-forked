import React from 'react';
import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
}

function TextArea({ id, label, required = false, ...props }: TextAreaProps) {
  return (
    <div className='relative mobile:text-sm'>
      {label ? (
        <label htmlFor={id} className='text-gray-700'>
          {label}
          {required ? (
            <span className='text-red-500 required-dot ml-1.5 align-middle'>
              *
            </span>
          ) : (
            <></>
          )}
        </label>
      ) : (
        <></>
      )}
      <textarea
        id={id}
        rows={2}
        cols={25}
        className='mobile:text-sm rounded-lg border-1 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        {...props}
      />
    </div>
  );
}

export default TextArea;
