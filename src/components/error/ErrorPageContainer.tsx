import { HTMLAttributes, ReactNode } from 'react';
import cn from '@/shared/styles/cn';

type ErrorPageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

const ErrorPageContainer = ({
  children,
  ...props
}: ErrorPageContainerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-5 min-h-[calc(100vh/1.5)] mt-16 mb-12',
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default ErrorPageContainer;
