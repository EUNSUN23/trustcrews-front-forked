import { request } from '@/lib/clientApi/request';
import { ResponseBody } from '@/utils/type';
import { ProjectCrew } from '@/features/project/auth/myProject/crews/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export const getProjectCrewList = async ({
  projectId,
}: {
  projectId: string | bigint;
}): Promise<ResponseBody<Record<'projectMembers', ProjectCrew[]>>> => {
  return await request('GET', `/api/project/crews/list?projectId=${projectId}`);
};

export const getProjectCrewListQueryKey = 'crewList';

export const useProjectCrewList = (projectId: string) => {
  return useSuspenseQuery({
    queryKey: [getProjectCrewListQueryKey, projectId],
    queryFn: () => getProjectCrewList({ projectId }),
  });
};
