import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/common';

type NavigatorProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

function Navigator({ children, ...props }: NavigatorProps) {
  return (
    <div
      className={classNames(
        'min-h-[80px] flex items-center space-x-2',
        props.className ? props.className : '',
      )}
    >
      {children}
    </div>
  );
}

export default Navigator;
