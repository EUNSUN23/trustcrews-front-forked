import TextArea from '@/shared/ui/TextArea';
import { useRecoilState } from 'recoil';
import FormRowWide from '@/components/FormRowWide';
import { postFormFieldSelector } from '@/features/launch/auth/store/PostFormStateStore';
import { ChangeEvent } from 'react';

const PostContent = () => {
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

export default PostContent;
