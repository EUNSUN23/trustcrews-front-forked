import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectHistoryData } from '@/lib/projectHistory/types';
import { bigIntToString } from '@/shared/utils/stringUtils';

import { PageResponseBody } from '@/types/responseBody';

export const getApplicantProjectHistory = async (
  userId: bigint,
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await request(
    'GET',
    `/api/user/history?pageNumber=${pageNumber}&userId=${userId}`,
  );
};

export const useApplicantProjectHistory = (
  applicantId: bigint,
  pageNumber: number,
) => {
  return useSuspenseQuery({
    queryKey: ['userHistory', pageNumber, bigIntToString(applicantId)],
    queryFn: () => getApplicantProjectHistory(applicantId, pageNumber),
  });
};
