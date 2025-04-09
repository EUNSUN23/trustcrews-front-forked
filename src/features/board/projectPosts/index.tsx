import PostList from './postList';
import { Search } from '@/features/board/projectPosts/search';

function ProjectPosts() {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <Search />
      <PostList />
    </section>
  );
}

export default ProjectPosts;
