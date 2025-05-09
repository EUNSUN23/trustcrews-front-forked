import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { projectInfoFormSelector } from '@/features/projectConfig/private/store/ProjectInfoFormStateStore';
import { ProjectInfoSummary } from '@/service/project/public/getProjectPublicInfo';

type ProjectNameProps = {
  initData: ProjectInfoSummary['projectName'];
};

const ConfigProjectNameControl = ({ initData }: ProjectNameProps) => {
  const [projectName, setProjectName] = useRecoilState(
    projectInfoFormSelector('projectName'),
  );

  const value = projectName ? projectName : initData;

  return (
    <FormRow>
      <Input
        id='projectName'
        label='프로젝트 이름'
        placeholder='이름을 입력해주세요.'
        value={value}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </FormRow>
  );
};

export default ConfigProjectNameControl;
