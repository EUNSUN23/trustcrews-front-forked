import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const ErrorMessage = ({
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        'text-2xl font-semibold w-full text-center mb-5',
        props.className,
      )}
    >
      {children}
    </h1>
  );
};

export default ErrorMessage;
