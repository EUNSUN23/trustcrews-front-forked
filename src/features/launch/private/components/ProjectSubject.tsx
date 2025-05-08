import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { projectFormFieldSelector } from '@/features/launch/auth/store/ProjectFormStateStore';
import { ChangeEvent } from 'react';

const ProjectSubject = () => {
  const [subject, setSubject] = useRecoilState(
    projectFormFieldSelector('subject'),
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  return (
    <FormRow className='pc:place-self-center'>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        value={subject}
        onChange={handleChangeInput}
      />
    </FormRow>
  );
};

export default ProjectSubject;
