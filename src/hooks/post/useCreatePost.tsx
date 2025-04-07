import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreatePostForm} from '@/app/postRegister/_utils/type';
import {isEqual} from 'lodash';
import {useRouter} from 'next/navigation';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {snackbarState} from '@/store/CommonStateStore';
import {
  postFormStateStore,
  projectFormStateStore,
} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import {DEFAULT_SEARCH_POST_PARAM} from '@/app/InitialPostsDataProvider';
import {createPost as createPostAPI} from "@/features/registerProjectPost/service";

export default function useCreatePost() {
  const resetPostFields = useResetRecoilState(postFormStateStore);
  const resetProjectFields = useResetRecoilState(projectFormStateStore);
  const queryClient = useQueryClient();
  const setSnackbar = useSetRecoilState(snackbarState);

  const router = useRouter();
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (createData: CreatePostForm) => createPostAPI(createData),
    onSuccess: async (data) => {
      const { message, result } = data;

      if (isEqual(result, 'success')) {
        setSnackbar({ show: true, type: 'SUCCESS', content: message });
        resetPostFields();
        resetProjectFields();
        const { techStacks, position, keyword, page } =
          DEFAULT_SEARCH_POST_PARAM;
        await queryClient.invalidateQueries({
          queryKey: ['postList', techStacks, position, keyword, page],
          refetchType: 'all',
        });
        await queryClient.invalidateQueries({ queryKey: ['myProjectList'] });
        router.replace('/');
      } else {
        setSnackbar({ show: true, type: 'ERROR', content: message });
      }
    },
    onError: (err: unknown) => {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: (err as Error).message,
      });
    },
  });

  return { createPost, isCreating: isPending };
}
