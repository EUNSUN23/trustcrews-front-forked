import ProjectInformation from '@/features/post/public/components/postDetail/ProjectInformation';
import ApplyProject from '@/features/post/public/contents/postDetail/ApplyProject';
import { usePostDetail } from '@/service/post/public/getPostDetail';
import { useProjectSummaryInfo } from '@/service/project/public/getProjectInfoSummary';
import PostInformation from '@/features/post/public/components/postDetail/PostInformation';
import PostIntroduction from '@/features/post/public/components/postDetail/PostIntroduction';
import PostTitle from '@/features/post/public/components/postDetail/PostTitle';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

type PostDetailProps = {
  postId: string;
};

const PostDetail = ({ postId }: PostDetailProps) => {
  const { data: postRes } = usePostDetail(numStrToBigInt(postId));

  const postInfo = postRes.data;

  const { data: projectRes } = useProjectSummaryInfo(postInfo.projectId);

  const projectInfo = projectRes.data;

  return (
    <article className='p-5 mobile:p-1'>
      <PostTitle postInfo={postInfo} />
      <article className='pc:w-[90%] w-full min-h-[350px] mobile:min-h-[300px] flex flex-col justify-center space-y-8 mobile:space-y-0'>
        <PostInformation postInfo={postInfo} />
        <ProjectInformation projectInfo={projectInfo} />
      </article>
      <PostIntroduction content={postInfo.content} />
      <ApplyProject postInfo={postInfo} />
    </article>
  );
};

export default PostDetail;
