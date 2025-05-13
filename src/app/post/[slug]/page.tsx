'use client';

import PostDetail from '@/features/post/public/contents/postDetail/PostDetail';

const PostPage = ({
  params: { slug: postId },
}: {
  params: { slug: string };
}) => {
  return <PostDetail postId={postId} />;
};

export default PostPage;
