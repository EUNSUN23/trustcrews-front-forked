'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/entities/project/store/ProjectIdStateStore';
import dynamic from 'next/dynamic';
import ProjectDetailSkeleton from '@/widgets/projectDetail/ProjectDetailSkeleton';

const ProjectDetail = dynamic(
  () => import('@/widgets/projectDetail/ProjectDetail'),
  { ssr: false, loading: () => <ProjectDetailSkeleton /> },
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

  if (currentProjectId === DEFAULT_PROJECT_ID) return <ProjectDetailSkeleton />;

  return <ProjectDetail />;
};

export default ProjectPage;
