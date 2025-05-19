import Button from '@/shared/ui/Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { projectFormStateStore } from '@/features/launch/private/store/ProjectFormStateStore';
import { postFormStateStore } from '@/features/launch/private/store/PostFormStateStore';
import { ZodError } from 'zod';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useLaunch } from '@/features/launch/private/service/launch';
import { useRouter } from 'next/navigation';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { createPostInputSchema } from '@/service/post/private/createPost';
import { createProjectInputSchema } from '@/service/project/private/createProject';

const LaunchButton = () => {
  const router = useRouter();
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const resetPostFormState = useResetRecoilState(postFormStateStore);
  const resetProjectFormState = useResetRecoilState(projectFormStateStore);

  const postForm = useRecoilValue(postFormStateStore);
  const projectForm = useRecoilValue(projectFormStateStore);

  const { mutate: createPostWithProject, isPending: isCreating } = useLaunch({
    onSuccess: async (res) => {
      setSuccessSnackbar(res.message);
      resetPostFormState();
      resetProjectFormState();
      router.replace('/');
    },
    onError: (res) => setErrorSnackbar(res.message),
  });

  const handleClickSaveButton = async () => {
    const postData = {
      ...postForm,
      positionIds: postForm.positionIds.map((v) => numStrToBigInt(v)),
    };
    const projectData = {
      ...projectForm,
      technologyIds: projectForm.technologyIds.map((item) =>
        numStrToBigInt(item),
      ),
    };

    try {
      createPostInputSchema.parse(postData);
      createProjectInputSchema.parse(projectData);
    } catch (e) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    createPostWithProject({ postData, projectData });
  };

  return (
    <Button disabled={isCreating} onClick={handleClickSaveButton}>
      등록
    </Button>
  );
};

export default LaunchButton;
