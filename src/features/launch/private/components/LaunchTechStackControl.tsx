import TechStackSelect from '@/components/techStack/public/TechStackSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { projectFormFieldSelector } from '@/features/launch/private/store/ProjectFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import { Suspense } from 'react';

const LaunchTechStackControl = () => {
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

export default LaunchTechStackControl;
