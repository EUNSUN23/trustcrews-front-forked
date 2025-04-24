import Button from '@/components/ui/button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  CrewFWModalState,
  crewFWModalStateStore,
  DEFAULT_FW_MODAL_STATE,
} from '@/features/project/auth/myProject/crews/store/CrewFWModalStateStore';
import { ProjectCrewProfile } from '@/features/project/auth/myProject/crews/types';
import { projectManageAuthStateStore } from '@/features/project/auth/myProject/global/store/ProjectManageAuthStateStore';

const { title: DEFALUT_TITLE } = DEFAULT_FW_MODAL_STATE;

const CrewFwButton = ({ crewInfo }: { crewInfo: ProjectCrewProfile }) => {
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
      projectId,
      crewId,
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
