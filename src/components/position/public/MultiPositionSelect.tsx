import MultiSelect from '@/shared/ui/MultiSelect';
import { SelectItem } from '@/shared/types/selectItem';
import { usePositionList } from '@/service/position/public/getPositionList';
import { PositionId } from '@/types/data/position';

type MultiPositionSelectProps = {
  positions: readonly PositionId[];
  setPositions: (item: readonly PositionId[]) => void;
  required?: boolean;
};

const MultiPositionSelect = ({
  positions,
  setPositions,
  required,
}: MultiPositionSelectProps) => {
  const {
    data: { data: positionListData },
  } = usePositionList();

  const positionList: SelectItem<string, PositionId>[] = positionListData.map(
    ({ positionId, positionName }) => ({
      name: positionName,
      value: positionId,
    }),
  );

  const selectedPositions: SelectItem<string, PositionId>[] =
    positionList.filter(({ value }) => positions.includes(value));

  return (
    <MultiSelect
      values={selectedPositions}
      setValues={(item) => setPositions(item.map((v) => v.value))}
      items={positionList}
      required={required}
    />
  );
};

export default MultiPositionSelect;
