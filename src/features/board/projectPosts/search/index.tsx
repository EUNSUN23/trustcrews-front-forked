import TechStackDropdown from '@/features/board/projectPosts/search/techStackDropdown';
import PositionDropdown from '@/features/board/projectPosts/search/PositionDropdown';
import TitleSearch from '@/features/board/projectPosts/search/TitleSearch';

export function Search() {
  return (
    <section
      aria-label='게시글 검색'
      className='mt-6 flex justify-between mobile:block mobile:space-y-5'
    >
      <div className='flex space-x-5'>
        <TechStackDropdown />
        <PositionDropdown />
      </div>
      <TitleSearch />
    </section>
  );
}
