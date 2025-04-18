'use client';

import CommonPagination from '@/components/ui/CommonPagination';
import PostCard from './PostCard';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageResponseBody, PostCardInfo } from '@/utils/type';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';
import PostListSkeleton from '@/features/board/projectPosts/postList/PostListSkeleton';
import { isQueryDataReady } from '@/hooks/common/useProjectInfoSummary';
import ErroredSection from '@/components/ui/error/ErroredSection';
import {
  postSearchValue,
  selectedPositionState,
  selectedTechStackState,
} from '@/features/board/projectPosts/store/PostSearchStateStore';
import { getPostList } from '@/features/board/projectPosts/service';
import { bigIntToString } from '@/utils/common';

const PostList = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const { value: selectedPosition } = useRecoilValue(selectedPositionState);
  const searchValue = useRecoilValue(postSearchValue);
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isPending, isRefetching, isError, isRefetchError } = useQuery<
    PageResponseBody<PostCardInfo[]>,
    Error,
    PageResponseBody<PostCardInfo[]>
  >({
    queryKey: [
      'postList',
      selectedTechStacks,
      bigIntToString(selectedPosition),
      searchValue,
      pageNumber,
    ],
    queryFn: () =>
      getPostList({
        techStacks: selectedTechStacks,
        position: bigIntToString(selectedPosition),
        keyword: searchValue,
        page: pageNumber,
      }),
    staleTime: 0,
  });

  const isDataPreparing = isPending || isRefetching;
  const isDataErrored = isError || isRefetchError;

  if (isQueryDataReady(isDataPreparing, isDataErrored, data)) {
    const infos = data.data.content;
    const totalPages = data.data.totalPages;

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

  if (isDataPreparing) return <PostListSkeleton itemCount={8} />;
  if (isDataErrored)
    return (
      <ErroredSection className='w-full mt-6 mobile:mt-2 min-h-[200px] mobile:text-2xl tablet:text-3xl'>
        ⚠️ 데이터 조회에 실패했습니다.
      </ErroredSection>
    );
};

export default PostList;
