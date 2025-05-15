import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postConfigFormFieldSelector } from '@/features/projectConfig/auth/store/PostConfigFormStateStore';

const PostConfigTitleControl = () => {
  const [title, setTitle] = useRecoilState(
    postConfigFormFieldSelector('title'),
  );

  return (
    <Input
      id='title'
      label='게시글 제목'
      placeholder='게시글 제목'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default PostConfigTitleControl;
