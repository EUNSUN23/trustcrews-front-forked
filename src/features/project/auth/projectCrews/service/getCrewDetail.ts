import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectCrewProfileInfo } from '@/features/project/auth/projectCrews/types';

import { bigIntToString } from '@/shared/utils/stringUtils';

import { ResponseBody } from '@/types/responseBody';

export const getCrewDetail = async (
  projectMemberId: bigint,
): Promise<ResponseBody<ProjectCrewProfileInfo>> => {
  return await request(
    'GET',
    `/api/project/crews/detail?projectMemberId=${projectMemberId}`,
  );
};

export const getCrewDetailQueryKey = 'crewDetail';

export const useCrewDetail = (projectMemberId: bigint) => {
  return useSuspenseQuery({
    queryKey: [getCrewDetailQueryKey, bigIntToString(projectMemberId)],
    queryFn: () => getCrewDetail(projectMemberId),
  });
};
