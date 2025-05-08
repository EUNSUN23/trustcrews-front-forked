import PositionSelect from '@/components/selector/PositionSelect';
import { userInfoFormFieldSelector } from '@/features/user/store/UserInfoFormStateStore';
import { useRecoilState } from 'recoil';

const PositionControl = () => {
  const [positionId, setPositionId] = useRecoilState(
    userInfoFormFieldSelector('positionId'),
  );

  const handleChangeSelect = (item: string) => {
    setPositionId(item);
  };

  return (
    <PositionSelect positionId={positionId} onChange={handleChangeSelect} />
  );
};

export default PositionControl;
