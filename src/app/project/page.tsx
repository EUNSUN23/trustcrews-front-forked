'use client';

import React, { use, useEffect } from 'react';
import ProjectInfo from '@/components/project/layout/projectInfo/ProjectInfo';
import ProjectNavTab from '@/components/project/layout/ProjectNavTab';
import useSetProjectIdState from '@/hooks/common/useSetProjectIdState';
import { useQueryClient } from '@tanstack/react-query';

function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; userId: string }>;
}) {
  const { projectId, userId } = use(searchParams);

  useSetProjectIdState(projectId);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['currentUserProjectAuth', projectId],
    });
  }, [queryClient, projectId]);

  return (
    <>
      <ProjectInfo projectId={projectId} />
      <ProjectNavTab projectId={projectId} userId={userId} />
    </>
  );
}

export default ProjectPage;
