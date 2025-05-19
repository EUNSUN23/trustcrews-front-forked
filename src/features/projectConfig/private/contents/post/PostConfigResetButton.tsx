import Button from '@/shared/ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { postConfigFormStateStore } from '@/features/projectConfig/private/store/PostConfigFormStateStore';
import { POST_CONFIG_QUERY_KEY } from '@/features/projectConfig/private/service/post/getPostConfig';

const PostConfigResetButton = () => {
  const resetProjectSettingBoardInfo = useResetRecoilState(
    postConfigFormStateStore,
  );

  const queryClient = useQueryClient();

  const handleClickResetButton = () => {
    resetProjectSettingBoardInfo();
    queryClient.invalidateQueries({
      queryKey: [POST_CONFIG_QUERY_KEY],
    });
  };

  return (
    <Button theme='primaryHollow' size='md' onClick={handleClickResetButton}>
      초기화
    </Button>
  );
};

export default PostConfigResetButton;
