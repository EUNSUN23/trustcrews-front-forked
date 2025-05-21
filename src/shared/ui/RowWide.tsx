import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const RowWide = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('w-full mobile:w-[300px] mx-auto', props.className)}>
      {props.children}
    </div>
  );
};

export default RowWide;
