import { request } from '@/lib/clientApi/request';
import { isEqual } from 'lodash';
import { throwErrorIfInvalid } from '@/utils/common';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';

export type ProjectSettingCrewAuthUpdData = {
  authMap: ProjectAuthCode;
  projectId: bigint;
  projectMemberId: bigint;
  projectMemberAuth: ProjectAuthCode;
};

/**
 * 프로젝트 설정 - 크루권한 수정
 * @param reqData
 */
export const updateProjectSettingCrewAuth = async (
  reqData: ProjectSettingCrewAuthUpdData,
) => {
  throwErrorIfInvalid(
    isEqual(reqData.projectMemberAuth, ''),
    '크루 권한을 선택해 주세요.',
  );

  return request('PUT', '/api/project/setting/crewAuth', reqData);
};
