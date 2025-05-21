import Button from '@/shared/ui/Button';
import { useResetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { projectConfigFormStateStore } from '@/features/projectConfig/store/project/ProjectConfigFormStateStore';
import { PROJECT_CONFIG_QUERY_KEY } from '@/features/projectConfig/api/project/getProjectConfig';

const ResetProjectConfigButton = () => {
  const resetProjectConfigForm = useResetRecoilState(
    projectConfigFormStateStore,
  );

  const queryClient = useQueryClient();

  const handleClickResetButton = () => {
    resetProjectConfigForm();
    queryClient.invalidateQueries({
      queryKey: [PROJECT_CONFIG_QUERY_KEY],
    });
  };

  return (
    <Button theme='primaryHollow' size='md' onClick={handleClickResetButton}>
      초기화
    </Button>
  );
};

export default ResetProjectConfigButton;
