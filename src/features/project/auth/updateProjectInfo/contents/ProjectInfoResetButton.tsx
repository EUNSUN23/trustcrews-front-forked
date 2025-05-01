import Button from '@/components/ui/button';
import { useResetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { projectInfoFormStateStore } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';
import { PROJECT_PUBLIC_INFO_QUERY_KEY } from '@/features/project/public/service/getProjectPublicInfo';

const ProjectInfoResetButton = () => {
  const resetProjectSettingInfo = useResetRecoilState(
    projectInfoFormStateStore,
  );

  const queryClient = useQueryClient();

  const handleClickResetButton = () => {
    resetProjectSettingInfo();
    queryClient.invalidateQueries({
      queryKey: [PROJECT_PUBLIC_INFO_QUERY_KEY],
    });
  };

  return (
    <Button theme='primaryHollow' size='md' onClick={handleClickResetButton}>
      초기화
    </Button>
  );
};

export default ProjectInfoResetButton;
