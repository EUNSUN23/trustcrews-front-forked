import { useRecoilState } from 'recoil';
import TextArea from '@/shared/ui/TextArea';
import { postInfoFormFieldSelector } from '@/features/projectConfig/private/store/PostInfoFormStateStore';
import { PostDetailData } from '@/service/post/public/getPostDetail';

type ContentProps = {
  initData: PostDetailData['content'];
};

const Content = ({ initData }: ContentProps) => {
  const [content, setContent] = useRecoilState(
    postInfoFormFieldSelector('content'),
  );

  const value = content ? content : initData;

  return (
    <TextArea
      id='content'
      label='프로젝트 소개'
      placeholder='프로젝트에 대해 소개해주세요.'
      rows={10}
      cols={25}
      value={value}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default Content;
