'use client';

import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';

const PositionBadgeVariants = cva(
  'inline-flex min-w-fit items-center rounded-full bg-[#F2F4F8] text-[#4A5E75] font-medium',
  {
    variants: {
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface PositionBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof PositionBadgeVariants> {
  text: string;
}

const PositionBadge = ({ size, text = '', ...props }: PositionBadgeProps) => {
  return (
    <span
      {...props}
      className={cn(PositionBadgeVariants({ size }), props.className)}
    >
      {text}
    </span>
  );
};

export default PositionBadge;
