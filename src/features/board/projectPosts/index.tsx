import PostList from './postList';
import { Search } from '@/features/board/projectPosts/search';
import { Suspense } from 'react';
import PostListSkeleton from '@/features/board/projectPosts/postList/PostListSkeleton';

function ProjectPosts() {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <Search />
      <Suspense fallback={<PostListSkeleton itemCount={8} />}>
        <PostList />
      </Suspense>
    </section>
  );
}

export default ProjectPosts;
