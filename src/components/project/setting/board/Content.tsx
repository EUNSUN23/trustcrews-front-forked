import {
  projectSettingBoardInfoSelector,
  ProjectSettingBoardInfoUpdField,
} from '@/store/project/setting/ProjectSettingFormStateStore';
import { useRecoilState } from 'recoil';
import TextArea from '@/components/ui/form/TextArea';

function Content({
  initData,
}: {
  initData: ProjectSettingBoardInfoUpdField<'content'>;
}) {
  const [content, setContent] = useRecoilState(
    projectSettingBoardInfoSelector('content'),
  );

  const value = content
    ? (content as ProjectSettingBoardInfoUpdField<'content'>)
    : initData;

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
}

export default Content;
