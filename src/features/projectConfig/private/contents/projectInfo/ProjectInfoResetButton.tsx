import Button from '@/shared/ui/Button';
import { useResetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { PROJECT_PUBLIC_INFO_QUERY_KEY } from '@/service/project/public/getProjectPublicInfo';
import { projectInfoFormStateStore } from '@/features/projectConfig/private/store/ProjectInfoFormStateStore';

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
