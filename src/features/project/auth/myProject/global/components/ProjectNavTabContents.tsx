'use client';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { ReactNode, useEffect } from 'react';
import Job from '@/features/project/auth/myProject/jobs/components/Job';
import JobSkeleton from '@/features/project/auth/myProject/jobs/components/JobSkeleton';
import { PROJECT_MENU } from '@/features/project/auth/myProject/global/constants/projectMenu';
import { useProjectManageAuth } from '@/features/project/auth/myProject/global/service/getProjectManageAuth';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/project/auth/myProject/global/store/ProjectManageAuthStateStore';
import { projectActiveNavState } from '@/features/project/auth/myProject/global/store/ProjectNavTabStateStore';
import Crews from '@/features/project/auth/myProject/crews/components/Crews';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: { value: PROJECT_CREWS },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const ProjectNavTabContents = () => {
  const projectId = useRecoilValue(projectIdState);
  const [pmAuth, setPMAuth] = useRecoilState(projectManageAuthStateStore);
  const resetPMAuth = useResetRecoilState(projectManageAuthStateStore);

  const {
    data: { data: pmAuthData },
  } = useProjectManageAuth(projectId);

  useEffect(() => {
    if (!pmAuth) setPMAuth(pmAuthData);
    return () => resetPMAuth();
  }, [pmAuth, setPMAuth, pmAuthData, resetPMAuth]);

  const activeNavTab = useRecoilValue(projectActiveNavState);

  if (!pmAuth) return <JobSkeleton />;

  let contents: ReactNode;
  switch (activeNavTab) {
    case PROJECT_TASK:
      contents = <Job />;
      break;
    case PROJECT_CREWS:
      contents = <Crews />;
      break;
    //   break;
    // case PM.NOTICE.code:
    //   contents = notice;
    //   break;
    // case PM.SETTING.code:
    //   contents = setting;
    //   break;
    default:
      throw Error(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return <>{contents}</>;
};

export default ProjectNavTabContents;
