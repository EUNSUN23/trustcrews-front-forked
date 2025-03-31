import React from 'react';
import Button from '@/components/ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { projectSettingBoardInfoStateStore } from '@/store/project/setting/ProjectSettingFormStateStore';

function ProjectSettingBoardInfoResetBtn() {
  const resetProjectSettingBoardInfo = useResetRecoilState(
    projectSettingBoardInfoStateStore,
  );
  const queryClient = useQueryClient();

  return (
    <Button
      theme='primary-hollow'
      size='md'
      onClickHandler={() => {
        resetProjectSettingBoardInfo();
        queryClient.invalidateQueries({ queryKey: ['postInfo'] });
      }}
    >
      초기화
    </Button>
  );
}

export default ProjectSettingBoardInfoResetBtn;
