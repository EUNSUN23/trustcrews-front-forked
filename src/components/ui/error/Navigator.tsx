import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/utils/common';

type NavigatorProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
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
