import React from 'react';
import {
  projectSettingBoardInfoSelector,
  ProjectSettingBoardInfoUpdField,
} from '@/store/project/setting/ProjectSettingFormStateStore';
import { useRecoilState } from 'recoil';
import Input from '@/components/ui/form/Input';

function Title({
  initData,
}: {
  initData: ProjectSettingBoardInfoUpdField<'title'>;
}) {
  const [title, setTitle] = useRecoilState(
    projectSettingBoardInfoSelector('title'),
  );

  const value = title
    ? (title as ProjectSettingBoardInfoUpdField<'title'>)
    : initData;

  return (
    <Input
      id='title'
      label='게시글 제목'
      placeholder='게시글 제목'
      value={value}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}

export default Title;
