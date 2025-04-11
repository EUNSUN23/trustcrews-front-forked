'use client';

import { BadgeVariants } from '@/utils/badge';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const TechStackBadgeVariants = BadgeVariants(
  'inline-flex items-center rounded-full bg-primary text-white font-medium',
);

interface TechStackBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof TechStackBadgeVariants> {
  text: string;
}

function TechStackBadge({ text, size, ...props }: TechStackBadgeProps) {
  return (
    <span
      {...props}
      className={cn(TechStackBadgeVariants({ size }), props.className)}
    >
      {text}
    </span>
  );
}

export default TechStackBadge;
