import React from 'react';
import { classNames, makeButtonSize } from '@/utils/common';
import { ButtonProps } from '@/components/ui/Button';

function ButtonStyleSkeleton({ size = 'md', children, ...props }: ButtonProps) {
  const { textSize, px, py } = makeButtonSize(size);

  return (
    <button
      className={classNames(
        props.className || '',
        textSize,
        px,
        py,
        `bg-gray-200 animate-pulse rounded-full font-semibold text-transparent`,
      )}
    >
      {children}
    </button>
  );
}

export default ButtonStyleSkeleton;
