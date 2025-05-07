import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const ErroredSection = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'w-full px-6 py-2 text-center font-medium text-greyDarkblue rounded-lg',
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default ErroredSection;
