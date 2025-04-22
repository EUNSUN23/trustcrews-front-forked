import Button from '@/components/ui/button';
import { useRecoilState } from 'recoil';
import {
  CrewFWModalState,
  crewFWModalStateStore,
} from '@/store/project/alert/modal/CrewFWModalStateStore';
import { ProjectMemberProfile } from '@/utils/type';
import { bigIntToString } from '@/utils/common';
import { useProjectManageAuth } from '@/features/project/auth/myProject/global/service/getProjectManageAuth';

function CrewFwButton({
  projectMemberInfo,
}: {
  projectMemberInfo: ProjectMemberProfile;
}) {
  const [createFWModalState, setCreateFWModalState] = useRecoilState(
    crewFWModalStateStore,
  );

  const { projectMemberId, projectId, projectMemberAuth } = projectMemberInfo;

  const {
    data: { data: currentUserPMAuth },
  } = useProjectManageAuth(bigIntToString(projectId));

  // if (isFetchingCurrentUserPMAuth)
  //   return <ButtonSkeleton size='md' className='w-[80px] h-[30px] my-3 ' />;

  const onClickCrewFWButtonHandler = () => {
    const updateModalState: CrewFWModalState = {
      title: createFWModalState.title,
      isOpen: true,
      createData: {
        project_id: projectId,
        fw_member_id: projectMemberId,
        fw_member_auth: projectMemberAuth.code,
        authMap: currentUserPMAuth!.code,
        reason: createFWModalState.createData.reason,
      },
    };
    setCreateFWModalState(updateModalState);
  };

  return (
    <Button
      type='button'
      theme='danger'
      size='md'
      onClick={onClickCrewFWButtonHandler}
    >
      강제탈퇴 투표
    </Button>
  );
}

export default CrewFwButton;
