import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const SquareSkeleton = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        `text-transparent bg-gray-200 animate-pulse rounded-sm`,
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default SquareSkeleton;
