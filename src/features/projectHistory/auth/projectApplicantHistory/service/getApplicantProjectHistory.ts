import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { PageResponseBody } from '@/types/responseBody';
import { ProjectHistoryData } from '@/types/data/projectHistory';

export const getApplicantProjectHistory = async (
  userId: bigint,
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await request(
    'GET',
    `/api/projectHistory?pageNumber=${pageNumber}&userId=${userId}`,
  );
};

export const useApplicantProjectHistory = (
  applicantId: bigint,
  pageNumber: number,
) => {
  return useSuspenseQuery({
    queryKey: [
      'applicantProjectHistory',
      pageNumber,
      bigIntToString(applicantId),
    ],
    queryFn: () => getApplicantProjectHistory(applicantId, pageNumber),
  });
};
