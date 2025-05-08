import Skeleton from '@/shared/ui/Skeleton';
import ConfigContainer from '@/features/project/auth/global/layouts/projectConfig/ConfigContainer';
import ConfigSummary from '@/features/project/auth/global/layouts/projectConfig/ConfigSummary';

const PMAuthSkeleton = () => {
  return (
    <ConfigContainer>
      <ConfigSummary>크루 권한</ConfigSummary>
      <div className='mx-auto mt-8 flow-root'>
        <div className='-ml-4 -my-2 overflow-x-auto sm:-ml-6 lg:-ml-12'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='w-full py-5 pl-4'>
              <Skeleton className='w-full h-[50px]' />
            </div>
            <div className='w-full py-5 pl-4'>
              <Skeleton className='w-full h-[50px]' />
            </div>
            <div className='w-full py-5 pl-4'>
              <Skeleton className='w-full h-[50px]' />
            </div>
            <div className='w-full py-5 pl-4'>
              <Skeleton className='w-full h-[50px]' />
            </div>
            <div className='w-full py-5 pl-4'>
              <Skeleton className='w-full h-[50px]' />
            </div>
          </div>
        </div>
      </div>
    </ConfigContainer>
  );
};

export default PMAuthSkeleton;
