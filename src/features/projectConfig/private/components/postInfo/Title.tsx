import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postInfoFormFieldSelector } from '@/features/projectConfig/private/store/PostInfoFormStateStore';
import { PostConfigData } from '@/features/projectConfig/private/service/post/getPostConfig';

type TitleProps = {
  initData: PostConfigData['title'];
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
