import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import {
  getPostList,
  SearchPostParams,
} from '@/features/board/projectPosts/service';

export const DEFAULT_SEARCH_POST_PARAM: SearchPostParams = {
  techStacks: [],
  position: '0',
  keyword: '',
  page: 0,
} as const;

async function InitialPostsDataProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  const { techStacks, position, keyword, page } = DEFAULT_SEARCH_POST_PARAM;
  await queryClient.prefetchQuery({
    queryKey: ['postList', techStacks, position, keyword, page],
    queryFn: () => getPostList(DEFAULT_SEARCH_POST_PARAM),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}

export default InitialPostsDataProvider;
