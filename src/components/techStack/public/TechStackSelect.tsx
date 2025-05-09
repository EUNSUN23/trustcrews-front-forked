import MultiSelect from '@/shared/ui/MultiSelect';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { useTechStackList } from '@/service/techStack/public/getTechStackList';

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
