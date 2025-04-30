'use client';

import { Suspense, useEffect } from 'react';
import ProjectInfo from '@/features/project/auth/global/components/ProjectInfo';
import { useRecoilState } from 'recoil';
import { ProjectInfoSkeleton } from '@/components/ui/skeleton/project/task';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/features/project/auth/global/store/ProjectIdStateStore';
import ProjectPageSkeleton from '@/features/project/auth/global/components/ProjectPageSkeleton';
import dynamic from 'next/dynamic';
import ProjectNavTabContentsSkeleton from '@/features/project/auth/global/components/ProjectNavTabContentsSkeleton';
import ProjectNavTab from '@/features/project/auth/global/components/ProjectNavTab';

const ProjectNavTabContents = dynamic(
  () =>
    import(
      '@/features/project/auth/global/components/ProjectNavTabContents'
    ),
  { ssr: false, loading: () => <ProjectNavTabContentsSkeleton /> },
);

const ProjectPage = ({
  params: { slug: projectId },
}: {
  params: { slug: string };
}) => {
  const [currentProjectId, setCurrentProjectId] =
    useRecoilState(projectIdState);

  useEffect(() => {
    setCurrentProjectId(projectId);
  }, [setCurrentProjectId, projectId]);

  if (currentProjectId === DEFAULT_PROJECT_ID) return <ProjectPageSkeleton />;

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
