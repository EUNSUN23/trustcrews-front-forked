'use client';

import { Suspense, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/features/project/private/store/myProject/ProjectIdStateStore';
import dynamic from 'next/dynamic';
import ProjectContentsSkeleton from '@/features/project/private/contents/myProject/ProjectContentsSkeleton';
import ProjectSkeleton from '@/features/project/private/components/myProject/ProjectSkeleton';
import ProjectInfoSkeleton from '@/features/project/private/contents/myProject/ProjectInfoSkeleton';
import ProjectNavTab from '@/features/project/private/components/myProject/ProjectNavTab';
import ProjectInfo from '@/features/project/private/contents/myProject/ProjectInfo';

const ProjectContents = dynamic(
  () => import('@/features/project/private/contents/myProject/ProjectContents'),
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

  // todo - isLoading state로 관리
  if (currentProjectId === DEFAULT_PROJECT_ID) return <ProjectSkeleton />;

  return (
    <>
      <Suspense fallback={<ProjectInfoSkeleton />}>
        <ProjectInfo />
      </Suspense>
      <ProjectNavTab />
      <ProjectContents />
    </>
  );
};

export default ProjectPage;
