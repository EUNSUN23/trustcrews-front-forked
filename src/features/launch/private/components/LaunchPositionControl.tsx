import MultiPositionSelect from '@/components/position/public/MultiPositionSelect';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { PositionId } from '@/types/data/position';
import { postFormFieldSelector } from '@/features/launch/private/store/PostFormStateStore';

const LaunchPositionControl = () => {
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

export default LaunchPositionControl;
