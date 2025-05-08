import { isEqual } from 'lodash';
import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectInfoSummary } from '@/features/project/public/service/getProjectPublicInfo';
import { PageResponseBody } from '@/types/responseBody';
import { TrustGrade } from '@/types/data/trustGrade';

import { Position } from '@/types/data/position';
import { TechStackMapping } from '@/service/techStack/getTechStackMappings';

export interface SearchPostParams {
  techStacks: TechStackMapping[];
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

export type PostInfoSummary = {
  project: ProjectInfoSummary;
  boardId: bigint;
  title: string;
  recruitmentStatus: boolean;
  boardPositions: { boardPositionId: bigint | number; position: Position }[];
  boardPageView: number;
  user: {
    email: string;
    nickname: string;
    profileImgSrc: string | null;
    trustGrade: TrustGrade;
  };
  createDate: string;
  updateDate: string;
};

export const getPostList = async (
  params: SearchPostParams = {
    techStacks: [],
    position: '0',
    page: 0,
    keyword: '',
  },
): Promise<PageResponseBody<PostInfoSummary[]>> => {
  const queryParams = createQueryParams(params);
  return await request('GET', `/api/post/search?${queryParams}`);
};

export const usePostList = (params: SearchPostParams) => {
  return useSuspenseQuery({
    queryKey: [
      'postList',
      params.techStacks,
      params.position,
      params.page,
      params.keyword,
    ],
    queryFn: () => getPostList(params),
    staleTime: 0,
  });
};
