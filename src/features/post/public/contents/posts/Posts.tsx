'use client';

import { useState, useTransition } from 'react';
import TechStackFilter from '@/features/post/public/contents/postFilter/TechStackFilter';
import PositionFilter from '@/features/post/public/contents/postFilter/PositionFilter';
import TitleFilter from '@/features/post/public/contents/postFilter/TitleFilter';
import { useRecoilValue } from 'recoil';
import {
  postSearchValue,
  selectedPositionState,
  selectedTechStackState,
} from '@/features/post/public/store/PostSearchStateStore';
import { usePostList } from '@/features/post/public/service/getPostList';
import { bigIntToString } from '@/utils/common';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import PostCard from '@/features/post/public/components/posts/PostCard';

const Posts = () => {
  const [isPending] = useTransition();
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const { value: selectedPosition } = useRecoilValue(selectedPositionState);
  const searchValue = useRecoilValue(postSearchValue);
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data: {
      data: { content: infos, totalPages: totalItemsCount },
    },
  } = usePostList({
    techStacks: selectedTechStacks,
    position: bigIntToString(selectedPosition),
    keyword: searchValue,
    page: pageNumber,
  });

  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <section
        aria-label='게시글 검색'
        className='mt-6 flex justify-between mobile:block mobile:space-y-5'
      >
        <div className='flex space-x-5'>
          <TechStackFilter />
          <PositionFilter />
        </div>
        <TitleFilter />
      </section>
      <section className='mt-6 mobile:mt-2'>
        {totalItemsCount === 0 ? (
          <div className='flex items-center justify-center w-full h-[280px] bg-ground100 text-center rounded-md'>
            <p className='py-10 mobile:text-2xl tablet:text-3xl font-medium text-grey900'>
              게시글이 존재하지 않습니다.
            </p>
          </div>
        ) : (
          <>
            <ul
              role='list'
              className='grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10 mobile:gap-5 '
            >
              {infos.map((info) => (
                <li
                  key={info.boardId.toString()}
                  className='flex-col w-[280px] max-h-[330px] rounded-xl border-2 shadow-lg mobile:w-full mobile:mt-2'
                >
                  <PostCard key={info.boardId.toString()} postInfo={info} />
                </li>
              ))}
            </ul>
            <CommonPagination
              activePage={pageNumber + 1}
              itemsCountPerPage={ITEM_COUNT.CARDS}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={PAGE_RANGE.DEFAULT}
              onChange={(page) => setPageNumber(page - 1)}
            />
          </>
        )}
      </section>
    </section>
  );
};

export default Posts;
