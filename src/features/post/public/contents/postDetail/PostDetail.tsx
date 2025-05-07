import { ProjectPublicInfo } from '@/features/project/public/components/ProjectPublicInfo';
import ApplyProject from '@/features/projectApply/public/contents/ApplyProject';
import { usePostPublicInfo } from '@/features/post/public/service/getPostPublicInfo';
import { useProjectPublicInfo } from '@/features/project/public/service/getProjectPublicInfo';
import PostInformation from '@/features/post/public/components/postDetail/PostInformation';
import PostIntroduction from '@/features/post/public/components/postDetail/PostIntroduction';
import PostTitle from '@/features/post/public/components/postDetail/PostTitle';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

type PostDetailProps = {
  postId: string;
};

export const PostDetail = ({ postId }: PostDetailProps) => {
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
};
