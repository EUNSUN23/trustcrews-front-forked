import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { projectIdState } from '@/entities/project/store/ProjectIdStateStore';
import { ZodError } from 'zod';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { postConfigFormStateStore } from '@/features/projectConfig/store/post/PostConfigFormStateStore';
import { projectManageAuthStateStore } from '@/features/projectConfig/store/pmAuth/ProjectManageAuthStateStore';
import {
  updatePostConfigInputSchema,
  useUpdatePostConfig,
} from '@/features/projectConfig/api/post/updatePostConfig';

const PostConfigSaveButton = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    data: { title, positionIds, contact, content, recruitmentStatus },
  } = useRecoilValue(postConfigFormStateStore);

  const { mutate: updatePostInfo, isPending } = useUpdatePostConfig(
    numStrToBigInt(projectId),
    userPMAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleSavePostInfButton = () => {
    const data = {
      projectId: numStrToBigInt(projectId),
      title,
      positionIds: positionIds.map((v) => numStrToBigInt(v)),
      contact,
      content,
      recruitmentStatus,
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

export default PostConfigSaveButton;
