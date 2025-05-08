import TechStackSelect from '@/components/selector/TechStackSelect';
import { signUpFormFieldSelector } from '@/features/auth/store/SignUpFormStateStore';
import { useRecoilState } from 'recoil';

const SignUpTechStackControl = () => {
  const [techStackIds, setTechStackIds] = useRecoilState(
    signUpFormFieldSelector('techStackIds'),
  );

  return (
    <TechStackSelect
      selectedTechStackIds={techStackIds}
      onChange={(item) => setTechStackIds([...item])}
      label='관심 스택'
      placeholder='관심 스택을 선택해주세요.'
      required
    />
  );
};

export default SignUpTechStackControl;
