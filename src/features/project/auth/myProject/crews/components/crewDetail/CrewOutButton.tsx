'use client';

import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ProjectCrewProfile } from '@/features/project/auth/myProject/crews/types';
import {
  LeaveProjectInput,
  useLeaveProject,
} from '@/features/project/auth/myProject/leaveProject/service/leaveProject';

type CrewOutButtonProps = {
  crewInfo: ProjectCrewProfile;
};

const CrewOutButton = ({ crewInfo }: CrewOutButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { projectMemberAuth, projectMemberId, projectId } = crewInfo;
  const router = useRouter();

  const { mutate: leaveProject, isPending } = useLeaveProject({
    onSuccess: (res) => {
      setSuccessSnackbar(res.message);
      router.replace('/');
    },
    onError: (res) => setErrorSnackbar(res.message),
  });

  const handleClickLeaveButton = () => {
    if (confirm('프로젝트를 탈퇴하시겠습니까?')) {
      const reqData: LeaveProjectInput = {
        projectId,
        wMemberId: projectMemberId,
        wMemberAuth: projectMemberAuth.code,
      };
      leaveProject(reqData);
    }
  };

  return (
    <Button
      type='button'
      theme='primaryHollow'
      size='lg'
      onClick={handleClickLeaveButton}
      disabled={isPending}
    >
      프로젝트 탈퇴
    </Button>
  );
};

export default CrewOutButton;
