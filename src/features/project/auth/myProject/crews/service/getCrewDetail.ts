import { request } from '@/lib/clientApi/request';
import { ResponseBody } from '@/utils/type';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectCrewProfile } from '@/features/project/auth/myProject/crews/types';

export const getCrewDetail = async (
  projectMemberId: string | bigint,
): Promise<ResponseBody<ProjectCrewProfile>> => {
  return await request(
    'GET',
    `/api/project/crews/detail?projectMemberId=${projectMemberId}`,
  );
};

export const getCrewDetailQueryKey = 'crewDetail';

export const useCrewDetail = (projectMemberId: string) => {
  return useSuspenseQuery({
    queryKey: [getCrewDetailQueryKey, projectMemberId],
    queryFn: () => getCrewDetail(projectMemberId),
  });
};
