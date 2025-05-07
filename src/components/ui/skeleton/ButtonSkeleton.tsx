import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes, ReactNode } from 'react';
import cn from '@/shared/styles/cn';

const ButtonSkeletonVariants = cva(
  `bg-gray-200 animate-pulse rounded-full font-semibold text-transparent`,
  {
    variants: {
      size: {
        default:
          'text-sm mobile:px-2.5 tablet:px-3.5 mobile:py-1 tablet:py-1.5',
        sm: 'mobile:text-xs tablet:text-sm mobile:px-2.5 tablet:px-3 mobile:py-1 tablet:py-1',
        md: 'mobile:text-sm tablet:text-base mobile:px-3 tablet:px-3.5 mobile:py-1 tablet:py-1.5',
        lg: 'mobile:text-lg tablet:text-xl mobile:px-3.5 tablet:px-5 mobile:py-1.5 tablet:py-2',
        xl: 'mobile:text-lg tablet:text-xl mobile:px-4 tablet:px-6 mobile:py-2 tablet:py-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface ButtonSkeletonProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof ButtonSkeletonVariants> {
  children?: ReactNode;
}

const ButtonSkeleton = ({ children, size, ...props }: ButtonSkeletonProps) => {
  return (
    <div className={cn(ButtonSkeletonVariants({ size }), props.className)}>
      {children}
    </div>
  );
};

export default ButtonSkeleton;
