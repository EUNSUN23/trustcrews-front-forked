import Input from '@/components/ui/form/Input';
import {projectFieldSelector} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import {useRecoilState} from 'recoil';
import FormRow from '@/components/ui/form/FormRow';

function SubjectField() {
  const [{ subject }, setSubject] = useRecoilState(
    projectFieldSelector('subject'),
  );
  return (
    <FormRow className='pc:place-self-center'>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        value={subject}
        onChange={(e) => setSubject({ subject: e.target.value })}
      />
    </FormRow>
  );
}

export default SubjectField;
