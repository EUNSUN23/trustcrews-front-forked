import MultiSelect from '@/components/ui/selector/MultiSelect';
import { useTechStackList } from '@/lib/static/getTechStackList';
import { bigIntToString } from '@/shared/utils/stringUtils';

type TechStackSelectProps = {
  selectedTechStackIds: string[];
  onChange: (item: string[]) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const TechStackSelect = ({
  selectedTechStackIds,
  onChange,
  label,
  placeholder,
  required,
}: TechStackSelectProps) => {
  const {
    data: { data },
  } = useTechStackList();

  const techStackList = data.map(({ techStackId, techStackName }) => ({
    name: techStackName,
    value: bigIntToString(techStackId),
  }));

  const selectedTechStacks = techStackList.filter(({ value }) =>
    selectedTechStackIds.includes(value),
  );

  return (
    <MultiSelect
      values={selectedTechStacks}
      setValues={(item) => onChange(item.map(({ value }) => value))}
      items={techStackList}
      label={label}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default TechStackSelect;
