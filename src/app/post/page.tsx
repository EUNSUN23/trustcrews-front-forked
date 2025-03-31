import React, { use } from 'react';
import PostDetail from '@/components/postDetail/PostDetail';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { Metadata } from 'next';
import { numStrToBigInt } from '@/utils/common';
import { getPost } from '@/service/post/post';
import { PostInfo, ResponseBody } from '@/utils/type';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await searchParams;
  const postInfo: ResponseBody<PostInfo> = await getPost(
    numStrToBigInt(postId),
  );

  return {
    title: `${postInfo.data!.title} - 팀프로젝트 | TRUSTCREWS`,
    description: `${postInfo.data!.content}`,
  };
}

const PostDetailPage = ({
  searchParams,
}: {
  searchParams: Promise<{ postId: string; projectId: string }>;
}) => {
  const { postId, projectId } = use(searchParams);
  return (
    <>
      <PostDetail postId={postId} projectId={projectId} />
      <ConfirmModal />
    </>
  );
};

export default PostDetailPage;
