import InputStyleSkeleton from '@/components/ui/skeleton/InputStyleSkeleton';
import SettingBody from '@/components/project/setting/SettingBody';

function ProjectSettingInfoSkeleton() {
  return (
    <>
      <SettingBody>
        <InputStyleSkeleton label='프로젝트 이름' />
        <InputStyleSkeleton label='프로젝트 주제' />
        <div className='row-span-2'>
          <div className='w-[380px] tablet:w-full space-y-10 mobile:mx-auto'>
            <InputStyleSkeleton label='시작 날짜' />
            <InputStyleSkeleton label='종료 날짜' />
          </div>
        </div>
        <InputStyleSkeleton label='기술 스택' />
      </SettingBody>
    </>
  );
}

export default ProjectSettingInfoSkeleton;
