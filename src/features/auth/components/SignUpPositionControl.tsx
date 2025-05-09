import PositionSelect from '@/components/position/public/PositionSelect';
import { useRecoilState } from 'recoil';
import { signUpFormFieldSelector } from '@/features/auth/store/SignUpFormStateStore';

const SignUpPositionControl = () => {
  const [positionId, setPositionId] = useRecoilState(
    signUpFormFieldSelector('positionId'),
  );

  return (
    <PositionSelect
      positionId={positionId}
      onChange={(item) => setPositionId(item)}
      required
    />
  );
};

export default SignUpPositionControl;
