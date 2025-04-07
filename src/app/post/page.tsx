import PostDetail from '@/components/postDetail/PostDetail';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { Metadata } from 'next';
import { numStrToBigInt } from '@/utils/common';
import { ProjectPostDetailData, ResponseBody } from '@/utils/type';
import { getProjectPostDetail } from '@/features/projectPost/service';

export async function generateMetadata({
  searchParams: { postId },
}: {
  searchParams: { postId: string };
}): Promise<Metadata> {
  const data: ResponseBody<ProjectPostDetailData> = await getProjectPostDetail(
    numStrToBigInt(postId),
  );

  return {
    title: `${data!.data!.post.title} - 팀프로젝트 | TRUSTCREWS`,
    description: `${data!.data!.post.content}`,
  };
}

const PostDetailPage = ({
  searchParams: { postId },
}: {
  searchParams: { postId: string };
}) => {
  return (
    <>
      <PostDetail postId={postId} />
      <ConfirmModal />
    </>
  );
};

export default PostDetailPage;
