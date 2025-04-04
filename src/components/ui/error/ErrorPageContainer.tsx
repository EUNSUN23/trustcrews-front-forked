import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/utils/common';

type ErrorPageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

function ErrorPageContainer({ children, ...props }: ErrorPageContainerProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center space-y-5 min-h-[calc(100vh/1.5)] mt-16 mb-12',
        props.className ? props.className : '',
      )}
    >
      {children}
    </div>
  );
}

export default ErrorPageContainer;
