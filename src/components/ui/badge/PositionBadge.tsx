'use client';

import { BadgeVariants } from '@/utils/badge';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const PositionBadgeVariants = BadgeVariants(
  `inline-flex min-w-fit items-center rounded-full bg-[#F2F4F8] text-[#4A5E75] font-medium`,
);

interface PositionBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof PositionBadgeVariants> {
  text: string;
}

function PositionBadge({ size, text = '', ...props }: PositionBadgeProps) {
  return (
    <span
      {...props}
      className={cn(PositionBadgeVariants({ size }), props.className)}
    >
      {text}
    </span>
  );
}

export default PositionBadge;
