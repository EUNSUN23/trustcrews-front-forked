import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/common';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  sizeClassName?: string;
  text?: string;
}

function Skeleton({ sizeClassName = '', text = '', ...props }: SkeletonProps) {
  return (
    <div
      className={classNames(
        props.className || '',
        `${sizeClassName} text-transparent bg-gray-200 animate-pulse rounded-2xl`,
      )}
    >
      {text}
    </div>
  );
}

export default Skeleton;
