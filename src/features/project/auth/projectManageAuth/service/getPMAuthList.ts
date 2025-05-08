import { request } from '@/utils/clientApi/request';
import { ProjectAuthMap } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { useSuspenseQuery } from '@tanstack/react-query';

import { PageResponseBody } from '@/types/responseBody';

export const getPMAuthList = async (): Promise<
  PageResponseBody<ProjectAuthMap[]>
> => {
  return await request('GET', '/api/setting/crewAuth');
};

export const PM_AUTH_LIST_QUERY_KEY = 'crewOptions';

export const usePMAuthList = () => {
  return useSuspenseQuery({
    queryKey: [PM_AUTH_LIST_QUERY_KEY],
    queryFn: getPMAuthList,
  });
};
