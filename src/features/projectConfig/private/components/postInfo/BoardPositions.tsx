import { useRecoilState } from 'recoil';
import MultiPositionSelect from '@/components/selector/MultiPositionSelect';
import { PositionId } from '@/types/data/position';
import { postInfoFormFieldSelector } from '@/features/projectConfig/private/store/PostInfoFormStateStore';

type BoardPositionsProps = {
  initData: PositionId[];
};

const BoardPositions = ({ initData }: BoardPositionsProps) => {
  const [positionsId, setPositionsId] = useRecoilState(
    postInfoFormFieldSelector('positionIds'),
  );

  const value = positionsId.length > 0 ? positionsId : initData;

  return (
    <MultiPositionSelect
      positions={value}
      setPositions={(item) => setPositionsId(item)}
    />
  );
};

export default BoardPositions;
