import Button from '@/components/ui/button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { projectFormStateStore } from '@/features/launch/auth/store/ProjectFormStateStore';
import { postFormStateStore } from '@/features/launch/auth/store/PostFormStateStore';
import { createPostInputSchema } from '@/features/post/auth/service/createPost';
import { createProjectInputSchema } from '@/features/project/auth/createProject/service/createProject';
import { ZodError } from 'zod';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useLaunch } from '@/features/launch/auth/service/launch';
import { useRouter } from 'next/navigation';
import { numStrToBigInt } from '@/utils/common';

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
    const projectData = {
      ...projectForm,
      technologyIds: projectForm.technologyIds.map((item) =>
        numStrToBigInt(item),
      ),
    };

    try {
      createPostInputSchema.parse(postForm);
      createProjectInputSchema.parse(projectData);
    } catch (e) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    createPostWithProject({ postData: postForm, projectData });
  };

  return (
    <Button disabled={isCreating} onClick={handleClickSaveButton}>
      등록
    </Button>
  );
};

export default LaunchButton;
