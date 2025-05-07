import { HTMLAttributes, ReactNode } from 'react';
import cn from '@/shared/styles/cn';

type NavigatorProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

const Navigator = ({ children, ...props }: NavigatorProps) => {
  return (
    <div
      className={cn(
        'min-h-[80px] flex items-center space-x-2',
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default Navigator;
