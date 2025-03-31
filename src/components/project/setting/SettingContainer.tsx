import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/common';

interface SettingContainerProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function SettingContainer({ children, ...props }: SettingContainerProps) {
  return (
    <section
      className={
        props.className
          ? classNames(
              props.className,
              'max-w-[1100px] space-y-10 px-8 mobile:px-4',
            )
          : 'max-w-[1100px] space-y-10 px-8 mobile:px-4'
      }
    >
      {children}
    </section>
  );
}

export default SettingContainer;
