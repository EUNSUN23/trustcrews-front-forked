import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const LoaderVariants = cva(
  'm-auto ease-linear rounded-full border-t-blue-500 border-solid animate-spin',
  {
    variants: {
      size: {
        default: 'border-t-[6px] border-[6px] w-16 h-16',
        sm: 'border-t-[3px] border-[3px] w-[25px] h-[25px]',
        lg: 'border-t-[9px] border-[9px] w-20 h-20',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface LoaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof LoaderVariants> {}

const Loader = ({ size, ...props }: LoaderProps) => {
  return <div className={cn(LoaderVariants({ size }), props.className)}></div>;
};

export default Loader;
