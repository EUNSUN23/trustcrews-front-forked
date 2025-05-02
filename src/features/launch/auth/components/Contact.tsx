import Input from '@/components/ui/form/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/ui/form/FormRow';
import { postFormFieldSelector } from '@/features/launch/auth/store/PostFormStateStore';
import { ChangeEvent } from 'react';

const Contact = () => {
  const [contact, setContact] = useRecoilState(
    postFormFieldSelector('contact'),
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  return (
    <FormRow>
      <Input
        id='contact'
        label='연락 방법 (오픈 카톡 링크 / 이메일 / 구글 폼 주소)'
        value={contact}
        onChange={handleChangeInput}
      />
    </FormRow>
  );
};

export default Contact;
