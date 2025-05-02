import TechStackSelect from '@/components/ui/selector/TechStackSelect';
import { useRecoilState } from 'recoil';
import { TechStackValueType } from '@/utils/type';
import FormRow from '@/components/ui/form/FormRow';
import { projectFormFieldSelector } from '@/features/launch/auth/store/ProjectFormStateStore';

const TechStackSelector = () => {
  const [technologyIds, setTechIds] = useRecoilState(
    projectFormFieldSelector('technologyIds'),
  );

  const handleChangeSelect = (item: readonly TechStackValueType[]) => {
    setTechIds(item);
  };

  return (
    <FormRow>
      <TechStackSelect
        techStacks={technologyIds}
        onChange={handleChangeSelect}
        label='사용 스택'
      />
    </FormRow>
  );
};

export default TechStackSelector;
