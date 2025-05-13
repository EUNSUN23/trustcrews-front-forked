import TechStackSelect from '@/components/techStack/public/TechStackSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectConfigFormFieldSelector } from '@/features/projectConfig/private/store/ProjectConfigFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';

const ProjectConfigTechStackControl = () => {
  const [technologyIds, setTechnologyIds] = useRecoilState(
    projectConfigFormFieldSelector('technologyIds'),
  );

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
            selectedTechStackIds={technologyIds}
            onChange={handleChangeSelect}
            placeholder='기술 스택을 선택해주세요.'
          />
        </FieldQueryBoundary>
      </Field>
    </FormRow>
  );
};

export default ProjectConfigTechStackControl;
