import AvatarSkeleton from '@/components/ui/skeleton/AvatarSkeleton';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import React from 'react';

const PostDetailSkeleton = () => {
  return (
    <div className='p-5 mobile:p-1'>
      <div className='h-[130px] mobile:h-[100px] flex flex-col justify-center mt-5 mb-5 mobile:mt-0 space-y-6 mobile:space-y-3 border-b-2'>
        <Skeleton sizeClassName='w-[300px] h-10 mobile:h-8' />
        <div className='flex gap-3 items-center'>
          <div className='flex items-center gap-2'>
            <AvatarSkeleton
              size='md'
              className='relative inline-block h-8 w-8 mobile:h-7 mobile:w-7'
            />
            <Skeleton sizeClassName='w-20 h-6 mobile:h-5' />
          </div>
          <div>|</div>
          <Skeleton sizeClassName='w-20 h-6 mobile:h-5' />
        </div>
      </div>
      <div className='pc:w-[90%] w-full h-[350px] mobile:h-[300px] flex flex-col justify-center'>
        <div className='grid gap-x-1 grid-cols-2 gap-y-8 auto-rows-auto mobile:grid-cols-1 mobile:gap-y-0 mobile:text-sm'>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              프로젝트 이름
            </div>
            <Skeleton sizeClassName='w-[calc(100%-130px)] h-7 mobile:h-5 mr-5 mobile:mr-0' />
          </div>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              시작 예정
            </div>
            <Skeleton sizeClassName='w-[calc(100%-130px)] h-7 mobile:h-5 mr-5 mobile:mr-0' />
          </div>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              프로젝트 주제
            </div>
            <Skeleton sizeClassName='w-[calc(100%-130px)] h-7 mobile:h-5 mr-5 mobile:mr-0' />
          </div>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              종료 예정
            </div>
            <Skeleton sizeClassName='w-[calc(100%-130px)] h-7 mobile:h-5 mr-5 mobile:mr-0' />
          </div>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              사용 스택
            </div>
            <Skeleton sizeClassName='w-[calc(100%-130px)] h-7 mobile:h-5 mr-5 mobile:mr-0' />
          </div>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              연락 방법
            </div>
            <Skeleton sizeClassName='w-[calc(100%-130px)] h-7 mobile:h-5 mr-5 mobile:mr-0' />
          </div>
          <div className='flex gap-5 h-10 items-center break-words'>
            <div className='text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold'>
              모집 분야
            </div>
            <div className='w-[calc(100%-130px)] flex gap-1 items-center'>
              <Skeleton sizeClassName='w-full h-7 mobile:h-5 mr-5 mobile:mr-0' />
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-[250px] mobile:min-h-[150px] flex flex-col justify-center'>
        <div className='text-2xl font-bold text-black100 mobile:text-xl'>
          프로젝트 소개
        </div>
        <div className='py-10 mobile:py-5 border-t-2 mt-5 mobile:mt-3'>
          <Skeleton sizeClassName='w-full h-32 mobile:h-20' />
          {/*프로젝트 소개222*/}
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
