import MultiPositionSelect from '@/components/selector/MultiPositionSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/features/project/auth/shared/ui/form/FormRow';
import { postFormFieldSelector } from '@/features/launch/auth/store/PostFormStateStore';

import { PositionId } from '@/types/data/position';

const PositionSelector = () => {
  const [positionIds, setPositionIds] = useRecoilState(
    postFormFieldSelector('positionIds'),
  );

  const handleChangeSelect = (item: readonly PositionId[]) => {
    setPositionIds(item);
  };

  return (
    <FormRow>
      <MultiPositionSelect
        positions={positionIds}
        setPositions={handleChangeSelect}
      />
    </FormRow>
  );
};

export default PositionSelector;
