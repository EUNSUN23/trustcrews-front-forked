'use client';

import { useEffect } from 'react';
import PostTitle from '../post/components/PostTitle';
import PostInformation from '../post/components/PostInformation';
import PostIntroduction from '../post/components/PostIntroduction';
import { useResetRecoilState } from 'recoil';
import { projectApplyPositionState } from '@/features/projectPost/applyProject/store/ApplyPositionStateStore';
import ApplyProject from '@/features/projectPost/applyProject';
import { numStrToBigInt } from '@/utils/common';
import PostPageSkeleton from '@/features/projectPost/PostPageSkeleton';
import { usePostPublicInfo } from '@/features/post/service/getPostPublicInfo';
import { ProjectPublicInfo } from '@/features/project/public/components/ProjectPublicInfo';

const ProjectPost = ({ postId }: { postId: string }) => {
  const resetRecruitPositionState = useResetRecoilState(
    projectApplyPositionState,
  );

  useEffect(() => {
    return () => resetRecruitPositionState();
  }, [resetRecruitPositionState]);

  const { data: postData, isFetching: isPostDataFetching } = usePostPublicInfo(
    numStrToBigInt(postId),
  );

  if (isPostDataFetching) return <PostPageSkeleton />;

  const post = postData?.data;

  // todo - suspense로 전환하면서 삭제 예정
  if (!post) return null;

  return (
    <article className='p-5 mobile:p-1'>
      <PostTitle postInfo={post} />
      <article className='pc:w-[90%] w-full min-h-[350px] mobile:min-h-[300px] flex flex-col justify-center space-y-8 mobile:space-y-0'>
        <PostInformation postInfo={post} />
        <ProjectPublicInfo projectId={post.projectId} />
      </article>
      <PostIntroduction content={post.content} />
      <ApplyProject postInfo={post} />
    </article>
  );
};

export default ProjectPost;
