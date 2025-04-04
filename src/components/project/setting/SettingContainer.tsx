import { classNames } from '@/utils/common';
import { HTMLAttributes, ReactNode } from 'react';

interface SettingContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
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
