import Button from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { postInfoFormStateStore } from '@/features/project/auth/updatePostInfo/store/PostInfoFormStateStore';
import { POST_PUBLIC_INFO_QUERY_KEY } from '@/features/post/public/service/getPostPublicInfo';

const PostInfoResetButton = () => {
  const resetProjectSettingBoardInfo = useResetRecoilState(
    postInfoFormStateStore,
  );

  const queryClient = useQueryClient();

  const handleClickResetButton = () => {
    resetProjectSettingBoardInfo();
    queryClient.invalidateQueries({
      queryKey: [POST_PUBLIC_INFO_QUERY_KEY],
    });
  };

  return (
    <Button theme='primaryHollow' size='md' onClick={handleClickResetButton}>
      초기화
    </Button>
  );
};

export default PostInfoResetButton;
