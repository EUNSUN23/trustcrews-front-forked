import Input from '@/components/ui/form/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/ui/form/FormRow';
import { projectFormFieldSelector } from '@/features/launch/auth/store/ProjectFormStateStore';
import { ChangeEvent } from 'react';

const ProjectName = () => {
  const [name, setProjectName] = useRecoilState(
    projectFormFieldSelector('name'),
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <FormRow>
      <Input
        id='projectName'
        label='프로젝트 이름'
        value={name}
        onChange={handleChangeInput}
      />
    </FormRow>
  );
};

export default ProjectName;
