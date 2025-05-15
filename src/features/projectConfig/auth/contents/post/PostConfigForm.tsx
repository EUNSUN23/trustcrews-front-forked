import PostConfigPositionsControl from '@/features/projectConfig/auth/components/post/PostConfigPositionsControl';
import PostConfigContactControl from '@/features/projectConfig/auth/components/post/PostConfigContactControl';
import PostConfigContentControl from '@/features/projectConfig/auth/components/post/PostConfigContentControl';
import ProjectPostInfoSaveButton from '@/features/projectConfig/auth/contents/post/PostConfigSaveButton';
import PostConfigRecruitStatusControl from '@/features/projectConfig/auth/components/post/PostConfigRecruitStatusControl';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/features/project/auth/store/myProject/ProjectIdStateStore';
import PostConfigResetButton from '@/features/projectConfig/auth/contents/post/PostConfigResetButton';
import ConfigContainer from '@/features/projectConfig/auth/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectConfig/auth/layouts/ConfigSummary';
import ConfigContents from '@/features/projectConfig/auth/layouts/ConfigContents';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import PostConfigTitleControl from '@/features/projectConfig/auth/components/post/PostConfigTitleControl';
import { usePostConfig } from '@/features/projectConfig/auth/service/post/getPostConfig';
import { useEffect } from 'react';
import {
  postConfigFormLoadingSelector,
  postConfigFormStateStore,
} from '@/features/projectConfig/auth/store/PostConfigFormStateStore';
import PostConfigFormSkeleton from '@/features/projectConfig/auth/contents/post/PostConfigFormSkeleton';

const PostConfigForm = () => {
  const isFormLoading = useRecoilValue(postConfigFormLoadingSelector);
  const setPostConfigForm = useSetRecoilState(postConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data },
  } = usePostConfig(numStrToBigInt(projectId));

  const { title, postPositions, contact, recruitmentStatus, content } = data;
  const positionIds = postPositions.map((v) =>
    bigIntToString(v.position.positionId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setPostConfigForm({
        isFormLoading: false,
        data: {
          title,
          positionIds,
          contact,
          recruitmentStatus,
          content,
        },
      });
    }
  }, [
    isFormLoading,
    title,
    positionIds,
    contact,
    recruitmentStatus,
    content,
    setPostConfigForm,
  ]);

  if (isFormLoading) return <PostConfigFormSkeleton />;

  return (
    <ConfigContainer>
      <ConfigSummary>모집 게시글 정보</ConfigSummary>
      <ConfigContents>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigRecruitStatusControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigTitleControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigPositionsControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigContactControl />
        </div>
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto pc:col-span-2'>
          <PostConfigContentControl />
        </div>
      </ConfigContents>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <PostConfigResetButton />
        <ProjectPostInfoSaveButton />
      </div>
    </ConfigContainer>
  );
};

export default PostConfigForm;
