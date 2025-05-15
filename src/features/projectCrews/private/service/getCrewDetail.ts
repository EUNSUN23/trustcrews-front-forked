import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectCrewProfileInfo } from '@/features/projectCrews/private/types';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/types/responseBody';

export const getCrewDetail = async (
  projectMemberId: bigint,
): Promise<ResponseBody<ProjectCrewProfileInfo>> => {
  return await request('GET', `/api/projectCrew/auth/${projectMemberId}`);
};

export const CREW_DETAIL_QUERY_KEY = 'crewDetail';

export const useCrewDetail = (projectMemberId: bigint) => {
  return useSuspenseQuery({
    queryKey: [CREW_DETAIL_QUERY_KEY, bigIntToString(projectMemberId)],
    queryFn: () => getCrewDetail(projectMemberId),
  });
};
