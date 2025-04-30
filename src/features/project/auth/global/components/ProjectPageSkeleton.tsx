import {
  ProjectInfoSkeleton,
  ProjectNavTabSkeleton,
} from '@/components/ui/skeleton/project/task';
import ProjectNavTabContentsSkeleton from '@/features/project/auth/global/components/ProjectNavTabContentsSkeleton';

const ProjectPageSkeleton = () => {
  return (
    <>
      <ProjectInfoSkeleton />
      <ProjectNavTabSkeleton />
      <ProjectNavTabContentsSkeleton />
    </>
  );
};

export default ProjectPageSkeleton;
