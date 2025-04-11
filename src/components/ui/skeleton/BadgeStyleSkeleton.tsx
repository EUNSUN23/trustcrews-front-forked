import { HTMLAttributes } from 'react';
import { BadgeVariants } from '@/utils/badge';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const BadgeSkeletonVariants = BadgeVariants(
  'bg-gray-200 rounded-full animate-pulse text-transparent',
);

interface BadgeStyleSkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BadgeSkeletonVariants> {
  text?: string;
}

function BadgeStyleSkeleton({
  size,
  text = '시작전',
  ...props
}: BadgeStyleSkeletonProps) {
  return (
    <div className={cn(BadgeSkeletonVariants({ size }), props.className)}>
      {text}
    </div>
  );
}

export default BadgeStyleSkeleton;
