import ProjectName from '@/features/project/auth/updateProjectInfo/components/ProjectName';
import ProjectSubject from '@/features/project/auth/updateProjectInfo/components/ProjectSubject';
import ProjectDate from '@/features/project/auth/updateProjectInfo/components/ProjectDate';
import ProjectInfoResetButton from '@/features/project/auth/updateProjectInfo/contents/ProjectInfoResetButton';
import ProjectInfoSaveButton from '@/features/project/auth/updateProjectInfo/contents/ProjectInfoSaveButton';
import { useRecoilValue } from 'recoil';
import ProjectTechnologies from '@/features/project/auth/updateProjectInfo/components/ProjectTechnologies';
import { useProjectPublicInfo } from '@/features/project/public/service/getProjectPublicInfo';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import ConfigContainer from '@/features/project/auth/global/layouts/projectConfig/ConfigContainer';
import ConfigSummary from '@/features/project/auth/global/layouts/projectConfig/ConfigSummary';
import ConfigContents from '@/features/project/auth/global/layouts/projectConfig/ConfigContents';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const ProjectInfoForm = () => {
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data: projectInfo },
  } = useProjectPublicInfo(numStrToBigInt(projectId));

  const { projectName, projectSubject, startDate, endDate, technologyStacks } =
    projectInfo;

  return (
    <ConfigContainer>
      <ConfigSummary>프로젝트 정보</ConfigSummary>
      <ConfigContents>
        <ProjectName initData={projectName} />
        <ProjectSubject initData={projectSubject} />
        <ProjectDate initStartDate={startDate} initEndDate={endDate} />
        <ProjectTechnologies initData={technologyStacks} />
      </ConfigContents>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ProjectInfoResetButton />
        <ProjectInfoSaveButton initData={projectInfo} />
      </div>
    </ConfigContainer>
  );
};

export default ProjectInfoForm;
