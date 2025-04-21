'use client';

import { Suspense, useEffect } from 'react';
import ProjectInfo from '@/components/project/layout/projectInfo/ProjectInfo';
import ProjectNavTab from '@/components/project/layout/ProjectNavTab';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/store/project/ProjectInfoStateStore';
import ProjectNavTabContents from '@/components/project/layout/ProjectNavTabContents';
import JobPageSkeleton from '@/features/project/auth/myProject/jobs/components/JobPageSkeleton';
import { ProjectInfoSkeleton } from '@/components/ui/skeleton/project/task';

const ProjectPage = ({
  params: { slug: projectId },
}: {
  params: { slug: string };
}) => {
  const [currentProjectId, setCurrentProjectId] =
    useRecoilState(projectIdState);
  const resetCurrentProjectId = useResetRecoilState(projectIdState);

  useEffect(() => {
    if (!currentProjectId) setCurrentProjectId(projectId);
    return () => resetCurrentProjectId();
  }, [currentProjectId, setCurrentProjectId, projectId, resetCurrentProjectId]);

  if (!currentProjectId) return <JobPageSkeleton />;

  return (
    <>
      <Suspense fallback={<ProjectInfoSkeleton />}>
        <ProjectInfo />
      </Suspense>
      <ProjectNavTab />
      <ProjectNavTabContents />
    </>
  );
};

export default ProjectPage;
