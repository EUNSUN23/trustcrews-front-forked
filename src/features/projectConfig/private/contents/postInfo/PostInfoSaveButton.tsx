import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { ZodError } from 'zod';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { postInfoFormStateStore } from '@/features/projectConfig/private/store/PostInfoFormStateStore';
import { projectManageAuthStateStore } from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';
import {
  updatePostConfigInputSchema,
  useUpdatePostConfig,
} from '@/features/projectConfig/private/service/post/updatePostConfig';
import { PostConfigData } from '@/features/projectConfig/private/service/post/getPostConfig';

type PostInfoSaveButtonProps = {
  initData: PostConfigData;
};

const PostInfoSaveButton = ({ initData }: PostInfoSaveButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const projectId = useRecoilValue(projectIdState);
  const { code: userAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    title: initTitle,
    postPositions: initPostPositions,
    contact: initContact,
    content: initContent,
    recruitmentStatus: initRecruitmentStatus,
    postId,
  } = initData;

  const { title, positionIds, contact, content, recruitmentStatus } =
    useRecoilValue(postInfoFormStateStore);

  const { mutate: updatePostInfo, isPending } = useUpdatePostConfig(
    numStrToBigInt(projectId),
    postId,
    userAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleSavePostInfButton = () => {
    const data = {
      projectId: numStrToBigInt(projectId),
      postId,
      title: title ? title : initTitle,
      positionIds:
        positionIds.length > 0
          ? positionIds
          : initPostPositions.map((v) => v.position.positionId),
      contact: contact ? contact : initContact,
      content: content ? content : initContent,
      recruitmentStatus:
        recruitmentStatus !== null ? recruitmentStatus : initRecruitmentStatus,
    };

    try {
      updatePostConfigInputSchema.parse(data);
    } catch (e: unknown) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    updatePostInfo(data);
  };

  return (
    <Button
      size='md'
      onClick={handleSavePostInfButton}
      disabled={isPending}
      className='disabled:!bg-gray-400 disabled:!text-white'
    >
      저장
    </Button>
  );
};

export default PostInfoSaveButton;
