import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const Row = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        `w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto`,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export default Row;
