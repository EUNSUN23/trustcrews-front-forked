import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectInfoFormSelector } from '@/features/projectConfig/private/store/ProjectInfoFormStateStore';
import { ProjectInfoSummary } from '@/service/project/public/getProjectInfoSummary';

type ProjectSubjectProps = {
  initData: ProjectInfoSummary['projectSubject'];
};

const ConfigProjectSubjectControl = ({ initData }: ProjectSubjectProps) => {
  const [projectSubject, setProjectSubject] = useRecoilState(
    projectInfoFormSelector('projectSubject'),
  );

  const value = projectSubject ? projectSubject : initData;

  return (
    <FormRow>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        placeholder='주제를 입력해주세요.'
        value={value}
        onChange={(e) => setProjectSubject(e.target.value)}
      />
    </FormRow>
  );
};

export default ConfigProjectSubjectControl;
