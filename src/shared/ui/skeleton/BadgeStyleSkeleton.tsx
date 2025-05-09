import { HTMLAttributes } from 'react';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';

const BadgeSkeletonVariants = cva(
  'bg-gray-200 rounded-full animate-pulse text-transparent',
  {
    variants: {
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface BadgeStyleSkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BadgeSkeletonVariants> {
  text?: string;
}

const BadgeStyleSkeleton = ({
  size,
  text = '시작전',
  ...props
}: BadgeStyleSkeletonProps) => {
  return (
    <div className={cn(BadgeSkeletonVariants({ size }), props.className)}>
      {text}
    </div>
  );
};

export default BadgeStyleSkeleton;
