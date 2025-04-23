import { request } from '@/lib/clientApi/request';
import { ResponseBody } from '@/utils/type';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectCrewProfile } from '@/features/project/auth/myProject/crews/types';
import { bigIntToString } from '@/utils/common';

export const getCrewDetail = async (
  projectMemberId: bigint,
): Promise<ResponseBody<ProjectCrewProfile>> => {
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
