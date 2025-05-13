import TechStackSelect from '@/components/techStack/public/TechStackSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectInfoFormSelector } from '@/features/projectConfig/private/store/ProjectInfoFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import { ProjectConfigData } from '@/features/projectConfig/private/service/project/getProjectConfig';

type ProjectTechnologiesProps = {
  initData: ProjectConfigData['technologyStacks'];
};

const ConfigProjectTechStackControl = ({
  initData,
}: ProjectTechnologiesProps) => {
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
      <Field>
        <Label className='block text-gray-700 mobile:text-sm'>기술 스택</Label>
        <FieldQueryBoundary
          suspenseFallback={
            <SelectSkeleton placeholder='기술 스택을 선택해주세요.' />
          }
        >
          <TechStackSelect
            selectedTechStackIds={techStacks}
            onChange={handleChangeSelect}
            placeholder='기술 스택을 선택해주세요.'
          />
        </FieldQueryBoundary>
      </Field>
    </FormRow>
  );
};

export default ConfigProjectTechStackControl;
