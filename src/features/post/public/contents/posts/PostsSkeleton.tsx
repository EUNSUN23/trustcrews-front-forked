import TechStackDropdownSkeleton from '@/features/post/public/contents/postFilter/TeckStackFilterSkeleton';
import { PositionFilterSkeleton } from '@/features/post/public/contents/postFilter/PositionFilterSkeleton';
import CardListSkeleton from '@/shared/ui/skeleton/CardListSkeleton';
import Skeleton from '@/shared/ui/Skeleton';

const PostsSkeleton = () => {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <section
        aria-label='게시글 검색'
        className='mt-6 flex justify-between mobile:block mobile:space-y-5'
      >
        <div className='flex space-x-5'>
          <TechStackDropdownSkeleton />
          <PositionFilterSkeleton />
        </div>
        <Skeleton className='w-[150px] h-[40px]' />
      </section>
      <CardListSkeleton itemCount={8} />
    </section>
  );
};

export default PostsSkeleton;
