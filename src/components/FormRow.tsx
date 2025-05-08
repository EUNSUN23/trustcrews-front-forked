import { HTMLAttributes, ReactNode } from 'react';
import cn from '@/shared/styles/cn';

interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FormRow = ({ children, ...props }: FormRowProps) => {
  return (
    <div
      className={cn(
        `w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto`,
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default FormRow;
