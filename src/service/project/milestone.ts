import { ProjectAuthMapCode } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { sortByStartDate, throwErrorIfInvalid } from '@/utils/common';

/**
 * 프로젝트 마일스톤 목록 조회
 * @param projectId
 */
export async function getProjectMilestones(projectId: string) {
  const resBody = await request(
    'GET',
    `/api/project/milestone?projectId=${projectId}`,
  );

  return {
    ...resBody,
    data: resBody.data
      ? sortByStartDate(resBody.data!, 'asc').map((v, index) => ({
          ...v,
          index,
        }))
      : [],
  };
}

/**
 * 프로젝트 마일스톤 상세 조회
 * @param milestoneId
 */
export async function getMilestone(milestoneId: string) {
  return await request('GET', `/api/project/milestone/${milestoneId}`);
}

export type MilestoneAddReqData = {
  projectId: bigint;
  startDate: string;
  endDate: string;
  content: string;
  authMap: ProjectAuthMapCode;
};

/**
 * 프로젝트 마일스톤 생성
 * @param reqData
 */
export async function createMilestone(reqData: MilestoneAddReqData) {
  throwErrorIfInvalid(!reqData.content, '마일스톤 내용을 입력해 주세요');
  throwErrorIfInvalid(!reqData.startDate, '시작날짜를 선택해 주세요');
  throwErrorIfInvalid(!reqData.endDate, '종료날짜를 선택해 주세요');

  return await request('POST', `/api/project/milestone`, reqData);
}

export type MilestoneModReqData = {
  milestoneId: bigint;
  content: string;
  startDate: string;
  endDate: string;
  authMap: ProjectAuthMapCode;
};

/**
 * 프로젝트 마일스톤 수정
 * @param reqData
 */
export async function updateMilestone(reqData: MilestoneModReqData) {
  throwErrorIfInvalid(!reqData.content, '마일스톤 내용을 입력해 주세요');
  throwErrorIfInvalid(!reqData.startDate, '시작날짜를 선택해 주세요');
  throwErrorIfInvalid(!reqData.endDate, '종료날짜를 선택해 주세요');

  return await request('PATCH', `/api/project/milestone`, reqData);
}

export type DeleteMilestoneReqData = {
  milestoneId: bigint;
  projectId: bigint;
  authMap: ProjectAuthMapCode;
};

/**
 * 마일스톤 삭제
 * @param reqData
 */
export async function deleteMilestone(reqData: DeleteMilestoneReqData) {
  return await request('DELETE', `/api/project/milestone`, reqData);
}
