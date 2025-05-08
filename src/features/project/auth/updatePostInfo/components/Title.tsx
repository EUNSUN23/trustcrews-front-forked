import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postInfoFormFieldSelector } from '@/features/project/auth/updatePostInfo/store/PostInfoFormStateStore';

import { PostPublicInfoData } from '@/features/post/public/service/getPostPublicInfo';

type TitleProps = {
  initData: PostPublicInfoData['title'];
};

const Title = ({ initData }: TitleProps) => {
  const [title, setTitle] = useRecoilState(postInfoFormFieldSelector('title'));

  const value = title ? title : initData;

  return (
    <Input
      id='title'
      label='게시글 제목'
      placeholder='게시글 제목'
      value={value}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default Title;
