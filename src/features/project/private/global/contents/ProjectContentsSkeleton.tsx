'use client';

import { PROJECT_MENU } from '@/features/project/auth/global/constants/projectMenu';
import JobSkeleton from '@/features/project/auth/projectJobs/contents/JobSkeleton';
import { projectActiveNavState } from '@/features/project/auth/global/store/ProjectNavTabStateStore';
import { useRecoilValue } from 'recoil';
import CrewsSkeleton from '@/features/project/auth/projectCrews/contents/CrewsSkeleton';
import { NoticeSkeleton } from '@/features/project/auth/projectNotice/contents/NoticeSkeleton';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: { value: PROJECT_CREWS },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const ProjectContentsSkeleton = () => {
  const activeNavTab = useRecoilValue(projectActiveNavState);
  switch (activeNavTab) {
    case PROJECT_TASK:
      return <JobSkeleton />;
    case PROJECT_CREWS:
      return <CrewsSkeleton />;
    case PROJECT_NOTICE:
      return <NoticeSkeleton />;
    default:
      throw Error(`Unknown Project NavTab: ${activeNavTab}`);
  }
};

export default ProjectContentsSkeleton;
