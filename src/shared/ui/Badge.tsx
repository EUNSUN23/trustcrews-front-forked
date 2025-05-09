'use client';

import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';

const BadgeVariants = cva(
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

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof BadgeVariants> {
  text: string;
}

const Badge = ({ size, text = '', ...props }: BadgeProps) => {
  return (
    <span {...props} className={cn(BadgeVariants({ size }), props.className)}>
      {text}
    </span>
  );
};

export default Badge;
