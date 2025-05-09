import { useRecoilValue } from 'recoil';
import { useProjectPublicInfo } from '@/service/project/public/getProjectPublicInfo';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import ProjectInfoResetButton from '@/features/projectConfig/private/contents/projectInfo/ProjectInfoResetButton';
import ConfigProjectTechStackControl from '@/features/projectConfig/private/components/projectInfo/ConfigProjectTechStackControl';
import ProjectInfoSaveButton from '@/features/projectConfig/private/contents/projectInfo/ProjectInfoSaveButton';
import ConfigContainer from '@/features/projectConfig/private/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectConfig/private/layouts/ConfigSummary';
import ConfigContents from '@/features/projectConfig/private/layouts/ConfigContents';
import ConfigProjectNameControl from '@/features/projectConfig/private/components/projectInfo/ConfigProjectNameControl';
import ConfigProjectSubjectControl from '@/features/projectConfig/private/components/projectInfo/ConfigProjectSubjectControl';
import ConfigProjectDateControl from '@/features/projectConfig/private/components/projectInfo/ConfigProjectDateControl';

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
        <ConfigProjectNameControl initData={projectName} />
        <ConfigProjectSubjectControl initData={projectSubject} />
        <ConfigProjectDateControl
          initStartDate={startDate}
          initEndDate={endDate}
        />
        <ConfigProjectTechStackControl initData={technologyStacks} />
      </ConfigContents>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ProjectInfoResetButton />
        <ProjectInfoSaveButton initData={projectInfo} />
      </div>
    </ConfigContainer>
  );
};

export default ProjectInfoForm;
