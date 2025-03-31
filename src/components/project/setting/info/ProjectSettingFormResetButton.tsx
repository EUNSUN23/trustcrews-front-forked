import React from 'react';
import Button from '@/components/ui/Button';
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
      theme='primary-hollow'
      size='md'
      onClickHandler={() => {
        resetProjectSettingInfo();
        queryClient.invalidateQueries({ queryKey: ['projectInfoSummary'] });
      }}
    >
      초기화
    </Button>
  );
}

export default ProjectSettingFormResetButton;
