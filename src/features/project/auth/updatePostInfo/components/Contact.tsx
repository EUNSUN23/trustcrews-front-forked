import { useRecoilState } from 'recoil';
import Input from '@/components/ui/form/Input';
import { postInfoFormFieldSelector } from '@/features/project/auth/updatePostInfo/store/PostInfoFormStateStore';
import { PostPublicInfoData } from '@/utils/type';

type ContactProps = {
  initData: PostPublicInfoData['contact'];
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
