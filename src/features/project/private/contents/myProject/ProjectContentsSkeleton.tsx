'use client';

import JobSkeleton from '@/features/projectJobs/private/contents/JobSkeleton';
import { useRecoilValue } from 'recoil';
import { NoticeSkeleton } from '@/features/projectNotice/private/contents/NoticeSkeleton';
import { PROJECT_MENU } from '@/features/project/private/constants/myProject/projectMenu';
import { projectActiveNavState } from '@/features/project/private/store/myProject/ProjectNavTabStateStore';
import CrewsSkeleton from '@/features/projectCrews/private/contents/CrewsSkeleton';
import ProjectConfigSkeleton from '@/features/projectConfig/private/contents/ProjectConfigSkeleton';
import { ApplicationError } from '@/utils/error/ApplicationError';

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
    case PROJECT_SETTING:
      return <ProjectConfigSkeleton />;
    default:
      throw new ApplicationError(`Unknown Project NavTab: ${activeNavTab}`);
  }
};

export default ProjectContentsSkeleton;
