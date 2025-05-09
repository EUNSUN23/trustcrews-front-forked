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

export default ProjectContents;
