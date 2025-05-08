import Button from '@/shared/ui/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  CrewFWModalState,
  crewFWModalStateStore,
  DEFAULT_FW_MODAL_STATE,
} from '@/features/project/auth/projectCrews/store/CrewFWModalStateStore';
import { ProjectCrewProfileInfo } from '@/features/project/auth/projectCrews/types';
import { projectManageAuthStateStore } from '@/features/project/auth/projectManageAuth/store/ProjectManageAuthStateStore';

import { bigIntToString } from '@/shared/utils/stringUtils';

const { title: DEFALUT_TITLE } = DEFAULT_FW_MODAL_STATE;

const CrewFwButton = ({ crewInfo }: { crewInfo: ProjectCrewProfileInfo }) => {
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);
  const setCrewFWModalState = useSetRecoilState(crewFWModalStateStore);

  const {
    projectMemberId: crewId,
    projectId,
    projectMemberAuth: { code: crewPMAuth },
  } = crewInfo;

  const handleClickCrewFWButton = () => {
    const updateModalState: CrewFWModalState = {
      title: DEFALUT_TITLE,
      isOpen: true,
      projectId: bigIntToString(projectId),
      crewId: bigIntToString(crewId),
      crewPMAuth,
      userPMAuth,
    };
    setCrewFWModalState(updateModalState);
  };

  return (
    <Button
      type='button'
      theme='danger'
      size='md'
      onClick={handleClickCrewFWButton}
    >
      강제탈퇴 투표
    </Button>
  );
};

export default CrewFwButton;
