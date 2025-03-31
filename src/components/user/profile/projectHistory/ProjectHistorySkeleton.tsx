import Skeleton from '@/components/ui/skeleton/Skeleton';

const ProjectHistorySkeleton = () => {
  return (
    <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
      <div className='flex items-center my-8 mobile:my-4'>
        <Skeleton sizeClassName='w-[240px] h-8 mobile:h-7' />
      </div>
      <div className='flex-col space-y-4 mobile:space-y-2'>
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
      </div>
    </div>
  );
};

export default ProjectHistorySkeleton;
