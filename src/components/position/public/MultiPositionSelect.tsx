import MultiSelect from '@/shared/ui/MultiSelect';
import { SelectItem } from '@/shared/types/selectItem';
import { usePositionList } from '@/service/position/public/getPositionList';
import { bigIntToString } from '@/shared/utils/stringUtils';

type MultiPositionSelectProps = {
  positions: readonly string[];
  setPositions: (item: readonly string[]) => void;
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

  const positionList: SelectItem<string, string>[] = positionListData.map(
    ({ positionId, positionName }) => ({
      name: positionName,
      value: bigIntToString(positionId),
    }),
  );

  const selectedPositions: SelectItem<string, string>[] = positionList.filter(
    ({ value }) => positions.includes(value),
  );

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
