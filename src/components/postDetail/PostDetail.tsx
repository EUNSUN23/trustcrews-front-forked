'use client';

import { useEffect } from 'react';
import TitleSection from './TitleSection';
import ProjectInfoSection from './ProjectInfoSection';
import ProjectIntroSection from './ProjectIntroSection';
import { useQuery } from '@tanstack/react-query';
import PostDetailSkeleton from '@/components/ui/skeleton/postDetail/PostDetailSkeleton';
import JoinProject from '@/components/postDetail/JoinProject';
import { numStrToBigInt } from '@/utils/common';
import { useResetRecoilState } from 'recoil';
import { projectApplyPositionState } from '@/features/applyProject/store/ApplyPositionStateStore';
import { getProjectPostDetail } from '@/features/projectPost/service';

const PostDetail = ({
  postId,
  projectId,
}: {
  postId: string;
  projectId: string;
}) => {
  const resetRecruitPositionState = useResetRecoilState(
    projectApplyPositionState,
  );

  // unmount시 모집포지션 select state 초기화
  useEffect(() => {
    return () => resetRecruitPositionState();
  }, [resetRecruitPositionState]);

  const { data, isFetching } = useQuery({
    queryKey: ['postInfo', postId],
    queryFn: () => getProjectPostDetail(numStrToBigInt(postId)),
    staleTime: 0,
  });

  if (isFetching) return <PostDetailSkeleton />;

  const { post, project } = data!.data!;

  return (
    <article className='p-5 mobile:p-1'>
      <TitleSection postInfo={post} />
      <ProjectInfoSection
        projectInfo={project}
        contact={post.contact}
        boardPositions={post.boardPositions}
      />
      <ProjectIntroSection content={post.content} />
      <footer className='flex-col mb-5'>
        <JoinProject projectId={project.projectId} postInfo={post} />
      </footer>
    </article>
  );
};

export default PostDetail;
