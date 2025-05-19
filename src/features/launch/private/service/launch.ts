import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MY_PROJECTS_QUERY_KEY } from '@/features/project/private/service/myProjects/getMyProjects';
import {
  CreatePostInput,
  CreatePostRes,
  useCreatePost,
} from '@/service/post/private/createPost';
import {
  CreateProjectInput,
  CreateProjectRes,
  useCreateProject,
} from '@/service/project/private/createProject';

export const useLaunch = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: CreatePostRes | CreateProjectRes) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  const createProject = useCreateProject();
  const createPost = useCreatePost();

  return useMutation({
    mutationFn: async ({
      projectData,
      postData,
    }: {
      projectData: CreateProjectInput;
      postData: CreatePostInput;
    }) => {
      const projectRes = await createProject.mutateAsync(projectData);
      if (projectRes.result === 'success') {
        return await createPost.mutateAsync({
          projectId: projectRes.data.projectId,
          data: postData,
        });
      } else {
        return projectRes;
      }
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [MY_PROJECTS_QUERY_KEY],
        refetchType: 'all',
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
