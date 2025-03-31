import React from 'react';
import Skeleton from '@/components/ui/skeleton/Skeleton';

function RegisterNavSkeleton() {
  return (
    // <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] text-black100 font-semibold tablet:ml-auto mobile:ml-auto'>
    <Skeleton className='w-[100px] h-[30px] mobile:w-6 mobile:h-6' />
    // </li>
  );
}

export default RegisterNavSkeleton;
