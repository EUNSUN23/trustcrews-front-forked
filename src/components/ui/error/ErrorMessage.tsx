import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/common';

type ErrorMessageProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

function ErrorMessage({ children, ...props }: ErrorMessageProps) {
  return (
    <h1
      className={classNames(
        'text-2xl font-semibold w-full text-center mb-5',
        props.className ? props.className : '',
      )}
    >
      {children}
    </h1>
  );
}

export default ErrorMessage;
