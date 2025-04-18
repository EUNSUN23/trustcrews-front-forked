import TechStackSelect from '@/components/ui/selector/TechStackSelect';
import { useRecoilState } from 'recoil';
import { projectFieldSelector } from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import { TechStackValueType } from '@/utils/type';
import FormRow from '@/components/ui/form/FormRow';

function TechStackField() {
  const [{ technologyIds }, setTechIds] = useRecoilState(
    projectFieldSelector('technologyIds'),
  );

  return (
    <FormRow>
      <TechStackSelect
        techStacks={technologyIds!}
        setTechStacks={(item: readonly TechStackValueType[]) =>
          setTechIds({ technologyIds: item })
        }
        label='사용 스택'
      />
    </FormRow>
  );
}

export default TechStackField;
