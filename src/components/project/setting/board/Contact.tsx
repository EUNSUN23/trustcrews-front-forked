import React from 'react';
import {
  projectSettingBoardInfoSelector,
  ProjectSettingBoardInfoUpdField,
} from '@/store/project/setting/ProjectSettingFormStateStore';
import { useRecoilState } from 'recoil';
import Input from '@/components/ui/form/Input';

function Contact({
  initData,
}: {
  initData: ProjectSettingBoardInfoUpdField<'contact'>;
}) {
  const [contact, setContact] = useRecoilState(
    projectSettingBoardInfoSelector('contact'),
  );

  const value = contact
    ? (contact as ProjectSettingBoardInfoUpdField<'contact'>)
    : initData;

  return (
    <Input
      id='contact'
      label='연락 방법'
      placeholder='오픈 카톡 링크 / 이메일 / 구글 폼 주소'
      value={value}
      onChange={(e) => setContact(e.target.value)}
    />
  );
}

export default Contact;
