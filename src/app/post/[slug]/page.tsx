'use client';

import PostTitle from '@/features/post/components/PostTitle';
import PostInformation from '@/features/post/components/PostInformation';
import { ProjectPublicInfo } from '@/features/project/public/components/ProjectPublicInfo';
import PostIntroduction from '@/features/post/components/PostIntroduction';
import ApplyProject from '@/features/projectPost/applyProject';
import { usePostPublicInfo } from '@/features/post/service/getPostPublicInfo';
import { numStrToBigInt } from '@/utils/common';
import { useProjectPublicInfo } from '@/features/project/public/service/getProjectPublicInfo';

export default function PostPage({
  params: { slug: postId },
}: {
  params: { slug: string };
}) {
  const { data: postRes } = usePostPublicInfo(numStrToBigInt(postId));

  const postInfo = postRes.data;

  const { data: projectRes } = useProjectPublicInfo(postInfo.projectId);

  const projectInfo = projectRes.data;

  return (
    <article className='p-5 mobile:p-1'>
      <PostTitle postInfo={postInfo} />
      <article className='pc:w-[90%] w-full min-h-[350px] mobile:min-h-[300px] flex flex-col justify-center space-y-8 mobile:space-y-0'>
        <PostInformation postInfo={postInfo} />
        <ProjectPublicInfo projectInfo={projectInfo} />
      </article>
      <PostIntroduction content={postInfo.content} />
      <ApplyProject postInfo={postInfo} />
    </article>
  );
}
