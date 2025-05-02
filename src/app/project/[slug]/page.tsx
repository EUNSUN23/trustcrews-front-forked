'use client';

import { Suspense, useEffect } from 'react';
import ProjectInfo from '@/features/project/auth/global/contents/ProjectInfo';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/features/project/auth/global/store/ProjectIdStateStore';
import ProjectSkeleton from '@/features/project/auth/global/components/ProjectSkeleton';
import dynamic from 'next/dynamic';
import ProjectContentsSkeleton from '@/features/project/auth/global/contents/ProjectContentsSkeleton';
import ProjectNavTab from '@/features/project/auth/global/components/ProjectNavTab';
import ProjectInfoSkeleton from '@/features/project/auth/global/contents/ProjectInfoSkeleton';

const ProjectNavTabContents = dynamic(
  () => import('@/features/project/auth/global/contents/ProjectContents'),
  { ssr: false, loading: () => <ProjectContentsSkeleton /> },
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

  if (currentProjectId === DEFAULT_PROJECT_ID) return <ProjectSkeleton />;

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
