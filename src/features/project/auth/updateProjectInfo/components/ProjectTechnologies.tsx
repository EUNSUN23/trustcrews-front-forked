import TechStackSelect from '@/components/ui/selector/TechStackSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/features/project/auth/shared/ui/form/FormRow';
import { projectInfoFormSelector } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';
import SelectSkeleton from '@/components/ui/skeleton/SelectSkeleton';
import { Suspense } from 'react';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ProjectInfoSummary } from '@/features/project/public/service/getProjectPublicInfo';

type ProjectTechnologiesProps = {
  initData: ProjectInfoSummary['technologyStacks'];
};

const ProjectTechnologies = ({ initData }: ProjectTechnologiesProps) => {
  const [technologyIds, setTechnologyIds] = useRecoilState(
    projectInfoFormSelector('technologyIds'),
  );

  const techStacks =
    technologyIds.length > 0
      ? technologyIds
      : initData.map((v) => bigIntToString(v.techStackId));

  const handleChangeSelect = (item: string[]) => {
    setTechnologyIds([...item]);
  };

  return (
    <FormRow>
      <Suspense
        fallback={
          <SelectSkeleton
            label='사용 스택'
            placeholder='사용 스택을 선택해주세요.'
          />
        }
      >
        <TechStackSelect
          selectedTechStackIds={techStacks}
          onChange={handleChangeSelect}
          label='기술 스택'
          placeholder='기술 스택을 선택해주세요.'
        />
      </Suspense>
    </FormRow>
  );
};

export default ProjectTechnologies;
