import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { projectFormFieldSelector } from '@/features/launch/private/store/ProjectFormStateStore';
import { ChangeEvent } from 'react';

const LaunchProjectNameControl = () => {
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

export default LaunchProjectNameControl;
