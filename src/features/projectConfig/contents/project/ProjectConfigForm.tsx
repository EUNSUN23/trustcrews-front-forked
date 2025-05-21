import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/entities/project/store/ProjectIdStateStore';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectConfigButton from '@/features/projectConfig/contents/project/ResetProjectConfigButton';
import ProjectConfigTechStackControl from '@/features/projectConfig/components/project/ProjectConfigTechStackControl';
import SaveProjectConfigButton from '@/features/projectConfig/contents/project/SaveProjectConfigButton';
import ConfigContainer from '@/entities/projectConfig/components/ConfigContainer';
import ConfigSummary from '@/entities/projectConfig/components/ConfigSummary';
import ConfigContents from '@/entities/projectConfig/components/ConfigContents';
import ProjectConfigNameControl from '@/features/projectConfig/components/project/ProjectConfigNameControl';
import ProjectConfigSubjectControl from '@/features/projectConfig/components/project/ProjectConfigSubjectControl';
import ProjectConfigDateControl from '@/features/projectConfig/components/project/ProjectConfigDateControl';
import { useProjectConfig } from '@/features/projectConfig/api/project/getProjectConfig';
import { useEffect } from 'react';
import {
  projectConfigFormLoadingSelector,
  projectConfigFormStateStore,
} from '@/features/projectConfig/store/project/ProjectConfigFormStateStore';
import ProjectConfigFormSkeleton from '@/features/projectConfig/contents/project/ProjectConfigFormSkeleton';

const ProjectConfigForm = () => {
  const isFormLoading = useRecoilValue(projectConfigFormLoadingSelector);
  const setProjectConfigForm = useSetRecoilState(projectConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data: projectInfo },
  } = useProjectConfig(numStrToBigInt(projectId));

  const { projectName, projectSubject, startDate, endDate, technologyStacks } =
    projectInfo;

  const technologyIds = technologyStacks.map((v) =>
    bigIntToString(v.techStackId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setProjectConfigForm({
        isFormLoading: false,
        data: {
          projectName,
          projectSubject,
          startDate,
          endDate,
          technologyIds,
        },
      });
    }
  }, [
    isFormLoading,
    projectName,
    projectSubject,
    startDate,
    endDate,
    technologyIds,
    setProjectConfigForm,
  ]);

  if (isFormLoading) return <ProjectConfigFormSkeleton />;

  return (
    <ConfigContainer>
      <ConfigSummary>프로젝트 정보</ConfigSummary>
      <ConfigContents>
        <ProjectConfigNameControl />
        <ProjectConfigSubjectControl />
        <ProjectConfigDateControl />
        <ProjectConfigTechStackControl />
      </ConfigContents>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ResetProjectConfigButton />
        <SaveProjectConfigButton />
      </div>
    </ConfigContainer>
  );
};

export default ProjectConfigForm;
