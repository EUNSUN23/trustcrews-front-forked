import BoardPositions from '@/features/projectConfig/private/components/postInfo/BoardPositions';
import Contact from '@/features/projectConfig/private/components/postInfo/Contact';
import Content from '@/features/projectConfig/private/components/postInfo/Content';
import ProjectPostInfoSaveButton from '@/features/projectConfig/private/contents/postInfo/PostInfoSaveButton';
import RecruitmentStatus from '@/features/projectConfig/private/components/postInfo/RecruitmentStatus';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { usePostPublicInfo } from '@/service/post/public/getPostPublicInfo';
import PostInfoResetButton from '@/features/projectConfig/private/contents/postInfo/PostInfoResetButton';
import ConfigContainer from '@/features/projectConfig/private/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectConfig/private/layouts/ConfigSummary';
import ConfigContents from '@/features/projectConfig/private/layouts/ConfigContents';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import Title from '@/features/projectConfig/private/components/postInfo/Title';

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
