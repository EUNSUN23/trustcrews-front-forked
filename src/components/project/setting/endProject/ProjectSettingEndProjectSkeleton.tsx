import React from 'react';
import ButtonStyleSkeleton from '@/components/ui/skeleton/ButtonStyleSkeleton';
import SettingContainer from '@/components/project/setting/SettingContainer';
import SettingTitle from '@/components/project/setting/SettingTitle';

function ProjectSettingEndProjectSkeleton() {
  return (
    <SettingContainer>
      <SettingTitle>프로젝트 종료</SettingTitle>
      <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
        <ButtonStyleSkeleton>종료 투표 생성</ButtonStyleSkeleton>
      </div>
    </SettingContainer>
  );
}

export default ProjectSettingEndProjectSkeleton;
