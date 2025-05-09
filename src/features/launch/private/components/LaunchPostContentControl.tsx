import TextArea from '@/shared/ui/TextArea';
import { useRecoilState } from 'recoil';
import FormRowWide from '@/ui/FormRowWide';
import { ChangeEvent } from 'react';
import { postFormFieldSelector } from '@/features/launch/private/store/PostFormStateStore';

const LaunchPostContentControl = () => {
  const [content, setContent] = useRecoilState(
    postFormFieldSelector('content'),
  );

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <FormRowWide className='mt-12'>
      <TextArea
        id='postContent'
        label='프로젝트 소개'
        rows={10}
        cols={25}
        value={content}
        onChange={handleChangeTextArea}
      />
    </FormRowWide>
  );
};

export default LaunchPostContentControl;
