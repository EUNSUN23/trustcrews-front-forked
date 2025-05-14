'use client';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { ReactNode, useEffect } from 'react';
import Job from '@/features/projectJobs/private/contents/Job';
import JobSkeleton from '@/features/projectJobs/private/contents/JobSkeleton';
import Crews from '@/features/projectCrews/private/contents/Crews';
import { CrewDetail } from '@/features/projectCrews/private/contents/CrewDetail';
import { Notice } from '@/features/projectNotice/private/contents/Notice';
import { PROJECT_MENU } from '@/features/project/private/constants/myProject/projectMenu';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import {
  DEFAULT_PM_AUTH,
  projectManageAuthStateStore,
} from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';
import { useMyPMAuth } from '@/service/pmAuth/private/getMyPMAuth';
import { projectActiveNavState } from '@/features/project/private/store/myProject/ProjectNavTabStateStore';
import ProjectConfig from '@/features/projectConfig/private/contents/ProjectConfig';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import CrewsSkeleton from '@/features/projectCrews/private/contents/CrewsSkeleton';
import { NoticeSkeleton } from '@/features/projectNotice/private/contents/NoticeSkeleton';
import ProjectConfigSkeleton from '@/features/projectConfig/private/contents/ProjectConfigSkeleton';
import { ApplicationError } from '@/utils/error/ApplicationError';

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

const ProjectContents = () => {
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

  if (pmAuth.code === DEFAULT_AUTH) return <JobSkeleton />;

  let contents: ReactNode;
  let suspenseFallback: ReactNode = null;
  switch (activeNavTab) {
    case PROJECT_TASK:
      contents = <Job />;
      suspenseFallback = <JobSkeleton />;
      break;
    case PROJECT_CREWS:
      contents = <Crews />;
      suspenseFallback = <CrewsSkeleton />;
      break;
    case PROJECT_CREW_DETAIL:
      contents = <CrewDetail />;
      break;
    case PROJECT_NOTICE:
      contents = <Notice />;
      suspenseFallback = <NoticeSkeleton />;
      break;
    case PROJECT_SETTING:
      contents = <ProjectConfig />;
      suspenseFallback = <ProjectConfigSkeleton />;
      break;
    default:
      throw new ApplicationError(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return (
    <FieldQueryBoundary
      errorFallbackSize='lg'
      suspenseFallback={suspenseFallback}
    >
      {contents}
    </FieldQueryBoundary>
  );
};

export default ProjectContents;
