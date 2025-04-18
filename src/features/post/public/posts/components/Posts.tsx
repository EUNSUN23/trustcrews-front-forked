import { Suspense } from 'react';
import TechStackDropdown from '@/features/post/public/posts/components/filter/TechStackDropdown';
import PositionDropdown from '@/features/post/public/posts/components/filter/PositionDropdown';
import TitleSearch from '@/features/post/public/posts/components/filter/TitleSearch';
import PostList from '@/features/post/public/posts/components/postList';
import CardListSkeleton from '@/components/ui/skeleton/CardListSkeleton';
import TechStackDropdownSkeleton from '@/features/post/public/posts/components/skeleton/TeckStackDropdownSkeleton';
import { PositionDropdownSkeleton } from '@/features/post/public/posts/components/skeleton/PositionDropdownSkeleton';

function Posts() {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <section
        aria-label='게시글 검색'
        className='mt-6 flex justify-between mobile:block mobile:space-y-5'
      >
        <div className='flex space-x-5'>
          <Suspense fallback={<TechStackDropdownSkeleton />}>
            <TechStackDropdown />
          </Suspense>
          <Suspense fallback={<PositionDropdownSkeleton />}>
            <PositionDropdown />
          </Suspense>
        </div>
        <TitleSearch />
      </section>
      <Suspense fallback={<CardListSkeleton itemCount={8} />}>
        <PostList />
      </Suspense>
    </section>
  );
}

export default Posts;
