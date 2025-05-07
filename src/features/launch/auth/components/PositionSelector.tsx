import MultiPositionSelect from '@/components/ui/selector/MultiPositionSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/ui/form/FormRow';
import { postFormFieldSelector } from '@/features/launch/auth/store/PostFormStateStore';

import { PositionId } from '@/shared/types/position';

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
