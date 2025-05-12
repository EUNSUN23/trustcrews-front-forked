import TechStackSelect from '@/components/techStack/public/TechStackSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectFormFieldSelector } from '@/features/launch/private/store/ProjectFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import { Field, Label } from '@headlessui/react';

const LaunchTechStackControl = () => {
  const [technologyIds, setTechIds] = useRecoilState(
    projectFormFieldSelector('technologyIds'),
  );

  const handleChangeSelect = (item: string[]) => {
    setTechIds([...item]);
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
          />
        </FieldQueryBoundary>
      </Field>
    </FormRow>
  );
};

export default LaunchTechStackControl;
