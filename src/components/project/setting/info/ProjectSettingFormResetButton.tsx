import Button from '@/components/ui/button';
import { useResetRecoilState } from 'recoil';
import { projectSettingInfoStateStore } from '@/store/project/setting/ProjectSettingFormStateStore';
import { useQueryClient } from '@tanstack/react-query';

function ProjectSettingFormResetButton() {
  const resetProjectSettingInfo = useResetRecoilState(
    projectSettingInfoStateStore,
  );
  const queryClient = useQueryClient();

  return (
    <Button
      theme='primaryHollow'
      size='md'
      onClick={() => {
        resetProjectSettingInfo();
        queryClient.invalidateQueries({ queryKey: ['projectInfoSummary'] });
      }}
    >
      초기화
    </Button>
  );
}

export default ProjectSettingFormResetButton;
