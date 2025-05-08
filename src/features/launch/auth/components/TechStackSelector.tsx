import TechStackSelect from '@/components/selector/TechStackSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/features/project/auth/shared/ui/form/FormRow';
import { projectFormFieldSelector } from '@/features/launch/auth/store/ProjectFormStateStore';
import SelectSkeleton from '@/components/skeleton/SelectSkeleton';
import { Suspense } from 'react';

const TechStackSelector = () => {
  const [technologyIds, setTechIds] = useRecoilState(
    projectFormFieldSelector('technologyIds'),
  );

  const handleChangeSelect = (item: string[]) => {
    setTechIds([...item]);
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
          selectedTechStackIds={technologyIds}
          onChange={handleChangeSelect}
          label='사용 스택'
        />
      </Suspense>
    </FormRow>
  );
};

export default TechStackSelector;
