'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

export const ButtonVariants = cva(
  `rounded-full font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`,
  {
    variants: {
      theme: {
        primary: 'bg-primary text-white',
        primaryHollow: 'bg-white text-primary ring-1 ring-inset ring-primary',
        cancel: 'bg-grey200 text-black100',
        black: 'bg-black text-white',
        blackHollow: 'bg-white text-black100 ring-1 ring-inset ring-black100',
        disabled: 'bg-grey500 text-white',
        disabledHollow: 'bg-white text-grey500 ring-1 ring-inset ring-grey500',
        danger: 'bg-danger text-white',
      },
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
      theme: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children?: ReactNode;
  onClickHandler?: () => void;
  addClassName?: string;
}

function Button({
  size,
  theme,
  children,
  onClickHandler,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(ButtonVariants({ theme, size }), props.className)}
      onClick={() => {
        if (typeof onClickHandler === 'function') onClickHandler();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
