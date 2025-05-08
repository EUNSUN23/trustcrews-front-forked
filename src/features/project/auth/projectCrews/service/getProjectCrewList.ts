import { request } from '@/lib/clientApi/request';
import { ProjectCrew } from '@/features/project/auth/projectCrews/types';
import { useSuspenseQuery } from '@tanstack/react-query';

import { ResponseBody } from '@/types/responseBody';

export const getProjectCrewList = async ({
  projectId,
}: {
  projectId: string | bigint;
}): Promise<ResponseBody<Record<'projectMembers', ProjectCrew[]>>> => {
  return await request('GET', `/api/project/crews/list?projectId=${projectId}`);
};

export const CREW_LIST_QUERY_KEY = 'crewList';

export const useProjectCrewList = (projectId: string) => {
  return useSuspenseQuery({
    queryKey: [CREW_LIST_QUERY_KEY, projectId],
    queryFn: () => getProjectCrewList({ projectId }),
  });
};
