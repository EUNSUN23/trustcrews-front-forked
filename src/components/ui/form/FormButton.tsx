import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from '@/shared/styles/cn';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const FormButton = ({ children, ...props }: FormButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-full w-full h-12 mobile:h-10 py-2 px-4 font-medium bg-primary text-white shadow-sm mobile:text-sm',
        props.className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
