import Skeleton from '@/components/ui/skeleton/Skeleton';
import ButtonStyleSkeleton from '@/components/ui/skeleton/ButtonStyleSkeleton';
import InputStyleSkeleton from '@/components/ui/skeleton/InputStyleSkeleton';
import SettingContainer from '@/components/project/setting/SettingContainer';
import SettingTitle from '@/components/project/setting/SettingTitle';
import SettingBody from '@/components/project/setting/SettingBody';

function ProjectSettingBoardInfoSkeleton() {
  return (
    <SettingContainer>
      <SettingTitle>모집 게시글</SettingTitle>
      <SettingBody>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <div className='relative mobile:text-sm'>
            <span className='text-gray-700'>모집 상태</span>
            <Skeleton className='h-8 w-14 mt-2 flex-shrink-0 rounded-full' />
          </div>
        </div>
        <InputStyleSkeleton label='게시글 제목' />
        <InputStyleSkeleton label='모집 분야' />
        <InputStyleSkeleton label='연락 방법' />
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto col-span-2'>
          <div className='relative mobile:text-sm'>
            <span className='text-gray-700'>프로젝트 소개</span>
            <Skeleton className='w-full h-[250px] py-2 px-4' />
          </div>
        </div>
      </SettingBody>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <ButtonStyleSkeleton>초기화</ButtonStyleSkeleton>
        <ButtonStyleSkeleton>저장</ButtonStyleSkeleton>
      </div>
    </SettingContainer>
  );
}

export default ProjectSettingBoardInfoSkeleton;
