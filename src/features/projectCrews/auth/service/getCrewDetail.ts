import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectCrewProfileInfo } from '@/features/projectCrews/auth/types';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/types/responseBody';

export const getCrewDetail = async (
  crewId: bigint,
): Promise<ResponseBody<ProjectCrewProfileInfo>> => {
  return await request('GET', `/api/projectCrew/auth/${crewId}`);
};

export const CREW_DETAIL_QUERY_KEY = 'crewDetail';

export const useCrewDetail = (crewId: bigint) => {
  return useSuspenseQuery({
    queryKey: [CREW_DETAIL_QUERY_KEY, bigIntToString(crewId)],
    queryFn: () => getCrewDetail(crewId),
  });
};
