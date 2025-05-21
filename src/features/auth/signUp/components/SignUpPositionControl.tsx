import PositionSelect from '@/entities/position/components/PositionSelect';
import { useRecoilState } from 'recoil';
import { signUpFormFieldSelector } from '@/features/auth/signUp/store/SignUpFormStateStore';

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
