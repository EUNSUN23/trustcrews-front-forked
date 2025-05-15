import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectConfigFormFieldSelector } from '@/features/projectConfig/auth/store/ProjectConfigFormStateStore';

const ProjectConfigNameControl = () => {
  const [projectName, setProjectName] = useRecoilState(
    projectConfigFormFieldSelector('projectName'),
  );

  return (
    <FormRow>
      <Input
        id='projectName'
        label='프로젝트 이름'
        placeholder='이름을 입력해주세요.'
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </FormRow>
  );
};

export default ProjectConfigNameControl;
