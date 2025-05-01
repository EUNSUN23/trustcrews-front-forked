import Select from '@/components/ui/selector/Select';
import { ProjectAuthMap } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { usePMAuthList } from '@/features/project/auth/projectManageAuth/service/getPMAuthList';

type CrewAuthSelectItem = {
  name: ProjectAuthMap['name'];
  value: ProjectAuthMap['code'];
};

type PMAuthSelectorProps = {
  value: CrewAuthSelectItem;
  setValue: (value: CrewAuthSelectItem) => void;
};

const PMAuthSelector = ({ value, setValue }: PMAuthSelectorProps) => {
  const {
    data: {
      data: { content: crewOptions },
    },
  } = usePMAuthList();

  const crewOptionSelectItems = crewOptions.map((crew) => ({
    name: crew.name,
    value: crew.code,
  }));

  return (
    <div className='w-[230px] mobile:w-[95px]'>
      <Select items={crewOptionSelectItems} setValue={setValue} value={value} />
    </div>
  );
};

export default PMAuthSelector;
