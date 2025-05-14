import { TextareaHTMLAttributes } from 'react';

interface TextAreaSkeletonProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
}

const TextAreaSkeleton = ({
  label,
  required,
  rows = 2,
  cols = 25,
}: TextAreaSkeletonProps) => {
  return (
    <div className='relative mobile:text-sm'>
      {label ? (
        <label className='text-gray-700'>
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
        readOnly={true}
        disabled={true}
        rows={rows}
        cols={cols}
        className='rounded-lg flex-1 appearance-none w-full py-2 px-4 text-transparent bg-gray-200 animate-pulse placeholder-transparent shadow-sm focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent'
      />
    </div>
  );
};

export default TextAreaSkeleton;
