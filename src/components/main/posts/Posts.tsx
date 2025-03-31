import React from 'react';
import TitleSearch from './TitleSearch';
import TechStackDropdown from './TechStackDropdown';
import PostList from './PostList';
import PositionDropdown from '@/components/main/searchFilter/PositionDropdown';

const Posts = () => {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
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
      <PostList />
    </section>
  );
};

export default Posts;
