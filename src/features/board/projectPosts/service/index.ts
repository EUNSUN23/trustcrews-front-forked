import { isEqual } from 'lodash';
import { TechStackWithCategory } from '@/utils/type';
import { request } from '@/lib/clientApi/request';

export interface SearchPostParams {
  techStacks: TechStackWithCategory[];
  position: string;
  keyword: string;
  page: number;
}

export const createQueryParams = (params: SearchPostParams) => {
  const { techStacks, position, keyword, page } = params;
  const queryParams = new URLSearchParams();

  techStacks.forEach((stack) =>
    queryParams.append('technologyIds', stack.techStackId.toString()),
  );
  if (position !== '0') {
    queryParams.append('positionId', position);
  }
  if (!isEqual(keyword, '')) {
    queryParams.append('keyword', keyword);
  }
  queryParams.append('page', page.toString());

  return decodeURI(queryParams.toString());
};

/**
 * 게시글 목록 조회
 * @param params
 */
export const getPostList = async (
  params: SearchPostParams = {
    techStacks: [],
    position: '0',
    page: 0,
    keyword: '',
  },
) => {
  const queryParams = createQueryParams(params);
  return await request('GET', `/api/post/search?${queryParams}`);
};
