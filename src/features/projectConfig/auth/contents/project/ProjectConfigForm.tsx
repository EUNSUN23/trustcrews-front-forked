import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/features/project/auth/store/myProject/ProjectIdStateStore';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectConfigButton from '@/features/projectConfig/auth/contents/project/ResetProjectConfigButton';
import ProjectConfigTechStackControl from '@/features/projectConfig/auth/components/project/ProjectConfigTechStackControl';
import SaveProjectConfigButton from '@/features/projectConfig/auth/contents/project/SaveProjectConfigButton';
import ConfigContainer from '@/features/projectConfig/auth/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectConfig/auth/layouts/ConfigSummary';
import ConfigContents from '@/features/projectConfig/auth/layouts/ConfigContents';
import ProjectConfigNameControl from '@/features/projectConfig/auth/components/project/ProjectConfigNameControl';
import ProjectConfigSubjectControl from '@/features/projectConfig/auth/components/project/ProjectConfigSubjectControl';
import ProjectConfigDateControl from '@/features/projectConfig/auth/components/project/ProjectConfigDateControl';
import { useProjectConfig } from '@/features/projectConfig/auth/service/project/getProjectConfig';
import { useEffect } from 'react';
import {
  projectConfigFormLoadingSelector,
  projectConfigFormStateStore,
} from '@/features/projectConfig/auth/store/ProjectConfigFormStateStore';
import ProjectConfigFormSkeleton from '@/features/projectConfig/auth/contents/project/ProjectConfigFormSkeleton';

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
