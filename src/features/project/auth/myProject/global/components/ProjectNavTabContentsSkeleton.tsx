'use client';

import { PROJECT_MENU } from '@/features/project/auth/myProject/global/constants/projectMenu';
import JobSkeleton from '@/features/project/auth/myProject/jobs/components/JobSkeleton';
import { projectActiveNavState } from '@/features/project/auth/myProject/global/store/ProjectNavTabStateStore';
import { useRecoilValue } from 'recoil';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: { value: PROJECT_CREWS },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const ProjectNavTabContentsSkeleton = () => {
  const activeNavTab = useRecoilValue(projectActiveNavState);
  switch (activeNavTab) {
    case PROJECT_TASK:
      return <JobSkeleton />;
    default:
      throw Error(`Unknown Project NavTab: ${activeNavTab}`);
  }
};

export default ProjectNavTabContentsSkeleton;
