import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/features/project/auth/shared/ui/form/FormRow';
import { projectInfoFormSelector } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';

import { ProjectInfoSummary } from '@/features/project/public/service/getProjectPublicInfo';

type ProjectNameProps = {
  initData: ProjectInfoSummary['projectName'];
};

const ProjectName = ({ initData }: ProjectNameProps) => {
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

export default ProjectName;
