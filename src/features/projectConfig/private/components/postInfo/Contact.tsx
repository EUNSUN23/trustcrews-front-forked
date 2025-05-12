import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postInfoFormFieldSelector } from '@/features/projectConfig/private/store/PostInfoFormStateStore';
import { PostDetailData } from '@/service/post/public/getPostDetail';

type ContactProps = {
  initData: PostDetailData['contact'];
};

const Contact = ({ initData }: ContactProps) => {
  const [contact, setContact] = useRecoilState(
    postInfoFormFieldSelector('contact'),
  );

  const value = contact ? contact : initData;

  return (
    <Input
      id='contact'
      label='연락 방법'
      placeholder='오픈 카톡 링크 / 이메일 / 구글 폼 주소'
      value={value}
      onChange={(e) => setContact(e.target.value)}
    />
  );
};

export default Contact;
