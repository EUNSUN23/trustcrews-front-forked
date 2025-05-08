import MultiSelect from '@/shared/ui/MultiSelect';
import SelectSkeleton from '@/components/skeleton/SelectSkeleton';
import { SelectItem } from '@/shared/types/selectItem';
import { usePositionList } from '@/service/getPositionList';
import { PositionId } from '@/types/data/position';

interface MultiPositionSelectProps {
  positions: readonly PositionId[];
  setPositions: (item: readonly PositionId[]) => void;
  required?: boolean;
}

const MultiPositionSelect = ({
  positions,
  setPositions,
  required,
}: MultiPositionSelectProps) => {
  const { data, isFetching } = usePositionList();

  if (isFetching)
    return (
      <SelectSkeleton
        label='모집 분야'
        placeholder='모집 분야를 선택해주세요.'
      />
    );

  const positionList: SelectItem<string, PositionId>[] = data!.data!.map(
    ({ positionId, positionName }) => ({
      name: positionName,
      value: positionId,
    }),
  );

  const selectedPositions: SelectItem<string, PositionId>[] =
    positionList.filter(({ name, value }) => positions.includes(value));

  return (
    <MultiSelect
      values={selectedPositions}
      setValues={(item) => setPositions(item.map((v) => v.value))}
      items={positionList}
      label='모집 분야'
      required={required}
    />
  );
};

export default MultiPositionSelect;
