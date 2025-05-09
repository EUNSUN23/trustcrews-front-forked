import AvatarSkeleton from '@/shared/ui/skeleton/AvatarSkeleton';
import Skeleton from '@/shared/ui/Skeleton';

const UserUpdatePageLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <div className='w-full h-fit text-center'>
          <AvatarSkeleton size='lg' className='relative inline-block' />
        </div>
        <div className='text-center space-x-1'>
          <Skeleton sizeClassName='max-w-[110px] m-auto h-12 mobile:h-7' />
        </div>
        <Skeleton sizeClassName='w-full h-[68px] mobile:h-[60px]' />
        <Skeleton sizeClassName='w-full h-[68px] mobile:h-[60px]' />
        <Skeleton sizeClassName='w-full h-[68px] mobile:h-[60px]' />
        <Skeleton sizeClassName='w-full h-[68px] mobile:h-[60px]' />
        <Skeleton sizeClassName='w-full h-[120px] mobile:h-[105px]' />
        <Skeleton sizeClassName='w-full h-[48px] mobile:h-[40px]' />
      </div>
    </div>
  );
};

export default UserUpdatePageLoader;
