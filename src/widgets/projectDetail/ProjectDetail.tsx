import { ReactNode, Suspense, useEffect } from 'react';
import ProjectInfoSkeleton from '@/features/projectInfo/contents/ProjectInfoSkeleton';
import ProjectInfo from '@/features/projectInfo/contents/ProjectInfo';
import ProjectNavTab from '@/entities/project/components/ProjectNavTab';
import { PROJECT_MENU } from '@/entities/project/constants/projectMenu';
import {
  DEFAULT_PM_AUTH,
  projectManageAuthStateStore,
} from '@/features/projectConfig/store/pmAuth/ProjectManageAuthStateStore';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/entities/project/store/ProjectIdStateStore';
import { useMyPMAuth } from '@/entities/project/api/getMyPMAuth';
import { projectActiveNavState } from '@/entities/project/store/ProjectNavTabStateStore';
import ProjectJobSkeleton from '@/features/projectJob/contents/ProjectJobSkeleton';
import ProjectJob from '@/features/projectJob/contents/ProjectJob';
import ProjectCrews from '@/features/projectCrews/contents/ProjectCrews';
import ProjectCrewsSkeleton from '@/features/projectCrews/contents/ProjectCrewsSkeleton';
import { ProjectCrewDetail } from '@/features/projectCrewDetail/contents/ProjectCrewDetail';
import { ProjectNotice } from '@/features/projectNotice/contents/ProjectNotice';
import { ProjectNoticeSkeleton } from '@/features/projectNotice/contents/ProjectNoticeSkeleton';
import ProjectConfig from '@/features/projectConfig/contents/ProjectConfig';
import ProjectConfigSkeleton from '@/features/projectConfig/contents/ProjectConfigSkeleton';
import { ApplicationError } from '@/utils/error/ApplicationError';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import ProjectDetailSkeleton from '@/widgets/projectDetail/ProjectDetailSkeleton';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: {
    value: PROJECT_CREWS,
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const { code: DEFAULT_AUTH } = DEFAULT_PM_AUTH;

const ProjectDetail = () => {
  const projectId = useRecoilValue(projectIdState);
  const [pmAuth, setPMAuth] = useRecoilState(projectManageAuthStateStore);
  const resetPMAuth = useResetRecoilState(projectManageAuthStateStore);

  const {
    data: { data: pmAuthData },
  } = useMyPMAuth(projectId);

  useEffect(() => {
    setPMAuth(pmAuthData);

    return () => {
      resetPMAuth();
    };
  }, [setPMAuth, pmAuthData, resetPMAuth]);

  const activeNavTab = useRecoilValue(projectActiveNavState);

  if (pmAuth.code === DEFAULT_AUTH) return <ProjectDetailSkeleton />;

  let contents: ReactNode;

  let suspenseFallback: ReactNode = null;
  switch (activeNavTab) {
    case PROJECT_TASK:
      contents = <ProjectJob />;
      suspenseFallback = <ProjectJobSkeleton />;
      break;
    case PROJECT_CREWS:
      contents = <ProjectCrews />;
      suspenseFallback = <ProjectCrewsSkeleton />;
      break;
    case PROJECT_CREW_DETAIL:
      contents = <ProjectCrewDetail />;
      break;
    case PROJECT_NOTICE:
      contents = <ProjectNotice />;
      suspenseFallback = <ProjectNoticeSkeleton />;
      break;
    case PROJECT_SETTING:
      contents = <ProjectConfig />;
      suspenseFallback = <ProjectConfigSkeleton />;
      break;
    default:
      throw new ApplicationError(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return (
    <>
      <Suspense fallback={<ProjectInfoSkeleton />}>
        <ProjectInfo />
      </Suspense>
      <ProjectNavTab />
      <FieldQueryBoundary
        errorFallbackSize='lg'
        suspenseFallback={suspenseFallback}
      >
        {contents}
      </FieldQueryBoundary>
    </>
  );
};

export default ProjectDetail;
