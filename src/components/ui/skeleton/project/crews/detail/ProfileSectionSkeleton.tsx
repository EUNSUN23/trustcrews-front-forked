import React from 'react';
import AvatarSkeleton from '@/components/ui/skeleton/AvatarSkeleton';
import ButtonStyleSkeleton from '@/components/ui/skeleton/ButtonStyleSkeleton';
import BadgeStyleSkeleton from '@/components/ui/skeleton/BadgeStyleSkeleton';

function ProfileSectionSkeleton() {
  return (
    <div className='flex mobile:flex-col mobile:space-y-6 mobile:mt-4 px-1 py-4 mx-auto items-center justify-center'>
      <section className='mobile:w-full pc:w-[200px] tablet:w-[150px] tablet:mr-10 flex flex-col items-center'>
        <AvatarSkeleton size='md' />
        <ButtonStyleSkeleton size='md' className='w-[80px] h-[30px] my-3 ' />
      </section>
      <section className='mobile:w-full tablet:h-[200px] mobile:h-[180px] flex flex-col flex-wrap justify-between p-6 mobile:p-4 bg-ground100 rounded-lg'>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            프로젝트 권한
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <BadgeStyleSkeleton size='sm' />
          </span>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            프로젝트 포지션
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <BadgeStyleSkeleton size='sm' />
          </span>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            크루 상태
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto text-center tablet:text-lg font-medium text-greyBlue'>
            <BadgeStyleSkeleton size='sm' />
          </span>
        </div>
      </section>
    </div>
  );
}

export default ProfileSectionSkeleton;
