import { HTMLAttributes, ReactNode } from 'react';
import cn from '@/shared/styles/cn';

interface FormRowWideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FormRowWide = ({ children, ...props }: FormRowWideProps) => {
  return (
    <div className={cn('w-full mobile:w-[300px] mx-auto', props.className)}>
      {children}
    </div>
  );
};

export default FormRowWide;
