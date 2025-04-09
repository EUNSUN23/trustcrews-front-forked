import TextArea from '@/components/ui/form/TextArea';
import {useRecoilState} from 'recoil';
import {postFieldSelector} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import FormRowWide from '@/components/ui/form/FormRowWide';

function IntroField() {
  const [{ content }, setContent] = useRecoilState(
    postFieldSelector('content'),
  );

  return (
    <FormRowWide className='mt-12'>
      <TextArea
        id='information'
        label='프로젝트 소개'
        rows={10}
        cols={25}
        value={content}
        onChange={(e) => setContent({ content: e.target.value })}
      />
    </FormRowWide>
  );
}

export default IntroField;
