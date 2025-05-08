import TechStackSelect from '@/components/selector/TechStackSelect';
import { useRecoilState } from 'recoil';
import { userInfoFormFieldSelector } from '@/features/user/private/store/UserInfoFormStateStore';

const TechStackControl = () => {
  const [techStackIds, setTechStackIds] = useRecoilState(
    userInfoFormFieldSelector('techStackIds'),
  );

  const handleChangeSelect = (item: string[]) => {
    setTechStackIds(item);
  };

  return (
    <TechStackSelect
      label='관심 스택'
      selectedTechStackIds={techStackIds}
      onChange={handleChangeSelect}
    />
  );
};

export default TechStackControl;
