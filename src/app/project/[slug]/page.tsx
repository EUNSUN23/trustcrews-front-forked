'use client';

import { Suspense, useEffect } from 'react';
import ProjectInfo from '@/features/project/auth/myProject/global/components/ProjectInfo';
import ProjectNavTab from '@/features/project/auth/myProject/global/components/ProjectNavTab';
import { useRecoilState, useResetRecoilState } from 'recoil';
import ProjectNavTabContents from '@/features/project/auth/myProject/global/components/ProjectNavTabContents';
import JobSkeleton from '@/features/project/auth/myProject/jobs/components/JobSkeleton';
import { ProjectInfoSkeleton } from '@/components/ui/skeleton/project/task';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';

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

  if (!currentProjectId) return <JobSkeleton />;

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
