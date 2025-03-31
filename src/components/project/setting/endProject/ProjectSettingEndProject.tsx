import ProjectFinish from '@/components/project/setting/info/ProjectFinish';
import { bigIntToString } from '@/utils/common';
import SettingContainer from '@/components/project/setting/SettingContainer';
import SettingTitle from '@/components/project/setting/SettingTitle';

function ProjectSettingEndProject({ projectId }: { projectId: bigint }) {
  return (
    <SettingContainer>
      <SettingTitle>프로젝트 종료</SettingTitle>
      <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
        <p className='text-danger font-medium mb-5'>
          &#8251; 프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된
          모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요.
        </p>
        <ProjectFinish projectId={bigIntToString(projectId)} />
      </div>
    </SettingContainer>
  );
}

export default ProjectSettingEndProject;
