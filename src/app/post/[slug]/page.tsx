'use client';

import PostDetail from '@/features/postDetail/contents/PostDetail';

const PostPage = ({
  params: { slug: postId },
}: {
  params: { slug: string };
}) => {
  return <PostDetail postId={postId} />;
};

export default PostPage;
