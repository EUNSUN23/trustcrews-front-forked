'use client';

import CommonPagination from '@/components/ui/CommonPagination';
import PostCard from './PostCard';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import { bigIntToString } from '@/utils/common';
import {
  postSearchValue,
  selectedPositionState,
  selectedTechStackState,
} from '@/features/post/public/posts/store/PostSearchStateStore';
import { usePostList } from '@/features/post/public/posts/service/getPostList';

function PostList() {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const { value: selectedPosition } = useRecoilValue(selectedPositionState);
  const searchValue = useRecoilValue(postSearchValue);
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data: { data },
  } = usePostList({
    techStacks: selectedTechStacks,
    position: bigIntToString(selectedPosition),
    keyword: searchValue,
    page: pageNumber,
  });

  const infos = data.content;
  const totalPages = data.totalPages;

  if (totalPages === 0)
    return (
      <div className='flex items-center justify-center w-full h-[280px] bg-ground100 text-center rounded-md'>
        <p className='py-10 mobile:text-2xl tablet:text-3xl font-medium text-grey900'>
          게시글이 존재하지 않습니다.
        </p>
      </div>
    );

  return (
    <section className='mt-6 mobile:mt-2'>
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
        totalItemsCount={totalPages}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChangePageHandler={(page) => setPageNumber(page - 1)}
      />
    </section>
  );
}

export default PostList;
