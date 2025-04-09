import ProjectList from '@/features/board/myProjects/projectList';
import { ProjectApplyStatus } from '@/features/board/myProjects/projectApplyStatus';

export function MyProjects() {
  return (
    <>
      <ProjectApplyStatus />
      <ProjectList />
    </>
  );
}
