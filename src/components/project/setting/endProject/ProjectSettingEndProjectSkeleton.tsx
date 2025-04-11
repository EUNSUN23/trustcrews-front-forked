import SettingContainer from '@/components/project/setting/SettingContainer';
import SettingTitle from '@/components/project/setting/SettingTitle';
import ButtonSkeleton from '@/components/ui/skeleton/ButtonSkeleton';

function ProjectSettingEndProjectSkeleton() {
  return (
    <SettingContainer>
      <SettingTitle>프로젝트 종료</SettingTitle>
      <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
        <ButtonSkeleton>종료 투표 생성</ButtonSkeleton>
      </div>
    </SettingContainer>
  );
}

export default ProjectSettingEndProjectSkeleton;
