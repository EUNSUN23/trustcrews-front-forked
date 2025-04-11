import AvatarSkeleton from '@/components/ui/skeleton/AvatarSkeleton';
import Skeleton from '@/components/ui/skeleton/Skeleton';

const UserProfileSkeleton = () => {
  return (
    <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2 px-2'>
      <div className='space-y-2 mobile:space-y-1 w-full h-fit text-center my-6 mobile:my-4'>
        <AvatarSkeleton size='md' className='relative inline-block' />
        <div className='max-w-[300px] m-auto space-y-2'>
          <Skeleton sizeClassName='w-full h-[76px] mobile:h-[68px]' />
        </div>
        <Skeleton sizeClassName='max-w-[350px] m-auto h-6 mobile:h-5' />
        <Skeleton sizeClassName='max-w-[160px] m-auto h-14 mobile:h-8' />
        <Skeleton sizeClassName='max-w-[110px] m-auto h-12 mobile:h-7' />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
