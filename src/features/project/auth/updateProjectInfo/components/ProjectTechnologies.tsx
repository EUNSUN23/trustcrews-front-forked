import TechStackSelect from '@/components/ui/selector/TechStackSelect';
import { ProjectPublicInfoData, TechStackValueType } from '@/utils/type';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/ui/form/FormRow';
import { projectInfoFormSelector } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';

type ProjectTechnologiesProps = {
  initData: ProjectPublicInfoData['technologyStacks'];
};

const ProjectTechnologies = ({ initData }: ProjectTechnologiesProps) => {
  const [technologyIds, setTechnologyIds] = useRecoilState(
    projectInfoFormSelector('technologyIds'),
  );

  const techStacks =
    technologyIds.length > 0
      ? technologyIds
      : initData.map((v) => v.techStackId);

  return (
    <FormRow>
      <TechStackSelect
        techStacks={techStacks}
        setTechStacks={(item: readonly TechStackValueType[]) =>
          setTechnologyIds([...item])
        }
        label='기술 스택'
        placeholder='기술 스택을 선택해주세요.'
      />
    </FormRow>
  );
};

export default ProjectTechnologies;
