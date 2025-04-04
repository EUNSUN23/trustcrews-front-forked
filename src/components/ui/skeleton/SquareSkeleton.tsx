import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/utils/common';

interface SquareSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
function SquareSkeleton({ children = '', ...props }: SquareSkeletonProps) {
  return (
    <div
      className={classNames(
        props.className || '',
        `text-transparent bg-gray-200 animate-pulse rounded-sm`,
      )}
    >
      {children}
    </div>
  );
}

export default SquareSkeleton;
