'use client';

import PostDetail from '@/features/post/public/contents/postDetail/PostDetail';

export default function PostPage({
  params: { slug: postId },
}: {
  params: { slug: string };
}) {
  return <PostDetail postId={postId} />;
}
