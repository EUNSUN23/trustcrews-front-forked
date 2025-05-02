'use client';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { ReactNode, useEffect } from 'react';
import Job from '@/features/project/auth/projectJobs/contents/Job';
import JobSkeleton from '@/features/project/auth/projectJobs/contents/JobSkeleton';
import { PROJECT_MENU } from '@/features/project/auth/global/constants/projectMenu';
import { useMyPMAuth } from '@/features/project/auth/projectManageAuth/service/getMyPMAuth';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import {
  DEFAULT_PM_AUTH,
  projectManageAuthStateStore,
} from '@/features/project/auth/projectManageAuth/store/ProjectManageAuthStateStore';
import { projectActiveNavState } from '@/features/project/auth/global/store/ProjectNavTabStateStore';
import Crews from '@/features/project/auth/projectCrews/contents/Crews';
import { CrewDetail } from '@/features/project/auth/projectCrews/contents/CrewDetail';
import { Notice } from '@/features/project/auth/projectNotice/components/Notice';
import ProjectConfig from '@/features/project/auth/projectConfigView/contents/ProjectConfig';

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

const ProjectNavTabContents = () => {
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
  switch (activeNavTab) {
    case PROJECT_TASK:
      contents = <Job />;
      break;
    case PROJECT_CREWS:
      contents = <Crews />;
      break;
    case PROJECT_CREW_DETAIL:
      contents = <CrewDetail />;
      break;
    case PROJECT_NOTICE:
      contents = <Notice />;
      break;
    case PROJECT_SETTING:
      contents = <ProjectConfig />;
      break;
    default:
      throw Error(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return <>{contents}</>;
};

export default ProjectNavTabContents;
