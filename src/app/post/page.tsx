import ConfirmModal from '@/components/ui/ConfirmModal';
import { Metadata } from 'next';
import { numStrToBigInt } from '@/utils/common';
import { PostPublicInfoData, ResponseBody } from '@/utils/type';
import ProjectPost from '@/features/projectPost';
import { getPostPublicInfo } from '@/features/post/service/getPostPublicInfo';

export async function generateMetadata({
  searchParams: { postId },
}: {
  searchParams: { postId: string };
}): Promise<Metadata> {
  const data: ResponseBody<PostPublicInfoData> = await getPostPublicInfo(
    numStrToBigInt(postId),
  );

  return {
    title: `${data!.data!.title} - 팀프로젝트 | TRUSTCREWS`,
    description: `${data!.data!.content}`,
  };
}

const PostDetailPage = ({
  searchParams: { postId },
}: {
  searchParams: { postId: string };
}) => {
  return (
    <>
      <ProjectPost postId={postId} />
      <ConfirmModal />
    </>
  );
};

export default PostDetailPage;
