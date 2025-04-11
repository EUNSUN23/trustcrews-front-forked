import { ClassValue } from 'clsx';
import { cva } from 'class-variance-authority';

export const BadgeVariants = (...init: ClassValue[]) =>
  cva(init, {
    variants: {
      size: {
        xs: 'text-[11px] mobile:text-[9px] px-2 mobile:px-1 py-0.5 mobile:py-0',
        sm: 'tablet:text-sm mobile:text-xs px-2 py-1',
        md: 'tablet:text-lg mobile:text-base tablet:px-8 mobile:px-4 tablet:py-4 mobile:py-2',
        lg: 'text-lg px-8 py-4',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  });
