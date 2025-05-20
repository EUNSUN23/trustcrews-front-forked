import TechStackSelect from '@/components/techStack/public/TechStackSelect';
import { signUpFormFieldSelector } from '@/features/auth/store/SignUpFormStateStore';
import { useRecoilState } from 'recoil';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/ui/error/FieldQueryBoundary';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';

const SignUpTechStackControl = () => {
  const [techStackIds, setTechStackIds] = useRecoilState(
    signUpFormFieldSelector('techStackIds'),
  );

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>관심 스택</Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='관심 스택을 선택해주세요.' />
        }
      >
        <TechStackSelect
          selectedTechStackIds={techStackIds}
          onChange={(item) => setTechStackIds([...item])}
          placeholder='관심 스택을 선택해주세요.'
          required
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default SignUpTechStackControl;
