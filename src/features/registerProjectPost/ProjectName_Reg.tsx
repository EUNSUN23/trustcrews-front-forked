import Input from '@/components/ui/form/Input';
import {useRecoilState} from 'recoil';
import {projectFieldSelector} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import FormRow from '@/components/ui/form/FormRow';

function ProjectName_Reg() {
  const [{ name }, setProjectName] = useRecoilState(
    projectFieldSelector('name'),
  );

  return (
    <FormRow>
      <Input
        id='projectName'
        label='프로젝트 이름'
        value={name}
        onChange={(e) => setProjectName({ name: e.target.value })}
      />
    </FormRow>
  );
}

export default ProjectName_Reg;
