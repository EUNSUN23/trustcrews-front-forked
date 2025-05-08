import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { projectInfoFormSelector } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';

import { ProjectInfoSummary } from '@/features/project/public/service/getProjectPublicInfo';

type ProjectSubjectProps = {
  initData: ProjectInfoSummary['projectSubject'];
};

const ProjectSubject = ({ initData }: ProjectSubjectProps) => {
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

export default ProjectSubject;
