import Title from '@/features/project/auth/updatePostInfo/components/Title';
import BoardPositions from '@/features/project/auth/updatePostInfo/components/BoardPositions';
import Contact from '@/features/project/auth/updatePostInfo/components/Contact';
import Content from '@/features/project/auth/updatePostInfo/components/Content';
import ProjectPostInfoSaveButton from '@/features/project/auth/updatePostInfo/contents/PostInfoSaveButton';
import RecruitmentStatus from '@/features/project/auth/updatePostInfo/components/RecruitmentStatus';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { usePostPublicInfo } from '@/features/post/public/service/getPostPublicInfo';
import PostInfoResetButton from '@/features/project/auth/updatePostInfo/contents/PostInfoResetButton';
import ConfigContainer from '@/features/project/auth/global/layouts/projectConfig/ConfigContainer';
import ConfigSummary from '@/features/project/auth/global/layouts/projectConfig/ConfigSummary';
import ConfigContents from '@/features/project/auth/global/layouts/projectConfig/ConfigContents';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const PostInfoForm = () => {
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data },
  } = usePostPublicInfo(numStrToBigInt(projectId));

  const { title, boardPositions, contact, recruitmentStatus, content } = data;

  return (
    <ConfigContainer>
      <ConfigSummary>모집 게시글 정보</ConfigSummary>
      <ConfigContents>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <RecruitmentStatus initData={recruitmentStatus} />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <Title initData={title} />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <BoardPositions
            initData={boardPositions.map((v) => v.position.positionId)}
          />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <Contact initData={contact} />
        </div>
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto pc:col-span-2'>
          <Content initData={content} />
        </div>
      </ConfigContents>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <PostInfoResetButton />
        <ProjectPostInfoSaveButton initData={data} />
      </div>
    </ConfigContainer>
  );
};

export default PostInfoForm;
