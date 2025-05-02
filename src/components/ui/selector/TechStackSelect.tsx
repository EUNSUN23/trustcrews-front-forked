import MultiSelect from '@/components/ui/selector/MultiSelect';
import {
  SelectItem,
  TechStackNameType as Name,
  TechStackValueType as Value,
} from '@/utils/type';
import SelectSkeleton from '@/components/ui/skeleton/SelectSkeleton';
import { useTechStackList } from '@/lib/static/getTechStackList';

interface TechStackSelectProps {
  techStacks: readonly Value[];
  onChange: (item: readonly Value[]) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const TechStackSelect = ({
  techStacks,
  onChange,
  label,
  placeholder,
  required,
}: TechStackSelectProps) => {
  const {
    data: { data },
    isFetching,
  } = useTechStackList();

  if (isFetching)
    return (
      <SelectSkeleton
        label='사용 스택'
        placeholder='사용 스택을 선택해주세요.'
      />
    );

  const techStackList: SelectItem<Name, Value>[] = data.map(
    ({ techStackId, techStackName }) => ({
      name: techStackName,
      value: techStackId,
    }),
  );

  const selectedTechStacks: SelectItem<Name, Value>[] = techStackList.filter(
    ({ value }) => techStacks.includes(value),
  );

  return (
    <MultiSelect
      values={selectedTechStacks}
      setValues={(item: readonly SelectItem<Name, Value>[]) =>
        onChange(item.map(({ value }) => value))
      }
      items={techStackList}
      label={label}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default TechStackSelect;
