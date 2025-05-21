import ProjectInformation from '@/features/postDetail/components/ProjectInformation';
import ApplySection from '@/features/postDetail/contents/ApplySection';
import { usePostDetail } from '@/entities/post/api/getPostDetail';
import { useProjectSummaryInfo } from '@/entities/project/api/getProjectInfoSummary';
import PostInformation from '@/features/postDetail/components/PostInformation';
import PostIntroduction from '@/features/postDetail/components/PostIntroduction';
import PostTitle from '@/features/postDetail/components/PostTitle';
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
      <ApplySection postInfo={postInfo} />
    </article>
  );
};

export default PostDetail;
