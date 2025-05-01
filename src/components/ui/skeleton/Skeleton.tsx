import { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  sizeClassName?: string;
  text?: string;
}

const Skeleton = ({
  sizeClassName = '',
  text = '',
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        props.className || '',
        `${sizeClassName} text-transparent bg-gray-200 animate-pulse rounded-2xl`,
      )}
    >
      {text}
    </div>
  );
};

export default Skeleton;
