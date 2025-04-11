import Button from '@/components/ui/button';
import { useRecoilState } from 'recoil';
import {
  CrewFWModalState,
  crewFWModalStateStore,
} from '@/store/project/alert/modal/CrewFWModalStateStore';
import { ProjectMemberProfile } from '@/utils/type';
import { bigIntToString } from '@/utils/common';
import useCurrentUserPMAuth from '@/hooks/project/useCurrentUserPMAuth';
import ButtonSkeleton from '@/components/ui/skeleton/ButtonSkeleton';

function CrewFwButton({
  projectMemberInfo,
}: {
  projectMemberInfo: ProjectMemberProfile;
}) {
  const [createFWModalState, setCreateFWModalState] = useRecoilState(
    crewFWModalStateStore,
  );

  const { projectMemberId, projectId, projectMemberAuth } = projectMemberInfo;

  const { currentUserPMAuth, isFetchingCurrentUserPMAuth } =
    useCurrentUserPMAuth(bigIntToString(projectId));

  if (isFetchingCurrentUserPMAuth)
    return <ButtonSkeleton size='md' className='w-[80px] h-[30px] my-3 ' />;

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
      onClickHandler={onClickCrewFWButtonHandler}
    >
      강제탈퇴 투표
    </Button>
  );
}

export default CrewFwButton;
