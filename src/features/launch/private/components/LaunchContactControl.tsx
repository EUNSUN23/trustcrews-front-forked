import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { ChangeEvent } from 'react';
import { postFormFieldSelector } from '@/features/launch/private/store/PostFormStateStore';

const LaunchContactControl = () => {
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

export default LaunchContactControl;
