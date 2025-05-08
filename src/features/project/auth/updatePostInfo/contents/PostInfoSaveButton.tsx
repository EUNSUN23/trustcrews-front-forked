import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { postInfoFormStateStore } from '@/features/project/auth/updatePostInfo/store/PostInfoFormStateStore';
import {
  updatePostInfoInputSchema,
  useUpdatePostInfo,
} from '@/features/post/auth/service/updatePostInfo';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/project/auth/projectManageAuth/store/ProjectManageAuthStateStore';
import { ZodError } from 'zod';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { PostPublicInfoData } from '@/features/post/public/service/getPostPublicInfo';

type PostInfoSaveButtonProps = {
  initData: PostPublicInfoData;
};

const PostInfoSaveButton = ({ initData }: PostInfoSaveButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const projectId = useRecoilValue(projectIdState);
  const { code: userAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    title: initTitle,
    boardPositions: initBoardPositions,
    contact: initContact,
    content: initContent,
    recruitmentStatus: initRecruitmentStatus,
    boardId,
  } = initData;

  const { title, positionIds, contact, content, recruitmentStatus } =
    useRecoilValue(postInfoFormStateStore);

  const { mutate: updatePostInfo, isPending } = useUpdatePostInfo(
    numStrToBigInt(projectId),
    boardId,
    userAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleSavePostInfButton = () => {
    const data = {
      projectId: numStrToBigInt(projectId),
      boardId,
      title: title ? title : initTitle,
      positionIds:
        positionIds.length > 0
          ? positionIds
          : initBoardPositions.map((v) => v.position.positionId),
      contact: contact ? contact : initContact,
      content: content ? content : initContent,
      recruitmentStatus:
        recruitmentStatus !== null ? recruitmentStatus : initRecruitmentStatus,
    };

    try {
      updatePostInfoInputSchema.parse(data);
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
