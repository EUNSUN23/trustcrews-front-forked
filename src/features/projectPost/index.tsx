'use client';

import { useEffect } from 'react';
import Title from './Title';
import Information from './Information';
import Introduction from './Introduction';
import { useResetRecoilState } from 'recoil';
import { projectApplyPositionState } from '@/features/projectPost/applyProject/store/ApplyPositionStateStore';
import ApplyProject from '@/features/projectPost/applyProject';
import { useQuery } from '@tanstack/react-query';
import { getProjectPostDetail } from '@/features/projectPost/service';
import { numStrToBigInt } from '@/utils/common';
import ProjectPostSkeleton from '@/features/projectPost/ProjectPostSkeleton';

const ProjectPost = ({ postId }: { postId: string }) => {
  const resetRecruitPositionState = useResetRecoilState(
    projectApplyPositionState,
  );

  useEffect(() => {
    return () => resetRecruitPositionState();
  }, [resetRecruitPositionState]);

  const { data, isFetching } = useQuery({
    queryKey: ['projectPostDetail', postId],
    queryFn: () => getProjectPostDetail(numStrToBigInt(postId)),
  });

  if (isFetching) return <ProjectPostSkeleton />;

  const { post, project } = data!.data!;

  return (
    <article className='p-5 mobile:p-1'>
      <Title postInfo={post} />
      <Information
        projectInfo={project}
        contact={post.contact}
        boardPositions={post.boardPositions}
      />
      <Introduction content={post.content} />
      <ApplyProject projectId={project.projectId} postInfo={post} />
    </article>
  );
};

export default ProjectPost;
