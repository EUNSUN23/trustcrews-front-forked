import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectConfigFormFieldSelector } from '@/features/projectConfig/private/store/ProjectConfigFormStateStore';

const ProjectConfigSubjectControl = () => {
  const [projectSubject, setProjectSubject] = useRecoilState(
    projectConfigFormFieldSelector('projectSubject'),
  );

  return (
    <FormRow>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        placeholder='주제를 입력해주세요.'
        value={projectSubject}
        onChange={(e) => setProjectSubject(e.target.value)}
      />
    </FormRow>
  );
};

export default ProjectConfigSubjectControl;
