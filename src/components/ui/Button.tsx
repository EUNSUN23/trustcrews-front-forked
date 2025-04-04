'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames, makeButtonColor, makeButtonSize } from '@/utils/common';
import { ButtonSize, ButtonTheme } from '@/utils/type';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  theme?: ButtonTheme;
  children?: ReactNode;
  onClickHandler?: () => void;
}

function Button({
  size = 'md',
  theme = 'primary',
  children,
  onClickHandler,
  ...props
}: ButtonProps) {
  const { textSize, px, py } = makeButtonSize(size);
  const { bgColor, textColor, ring } = makeButtonColor(theme);

  return (
    <button
      {...props}
      className={classNames(
        props.className || '',
        textSize,
        px,
        py,
        bgColor,
        ring,
        `rounded-full font-semibold ${textColor} shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`,
      )}
      onClick={() => {
        if (typeof onClickHandler === 'function') onClickHandler();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
