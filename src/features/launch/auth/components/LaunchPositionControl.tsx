import { useRecoilState } from 'recoil';
import FormRow from '@/ui/FormRow';
import { postFormFieldSelector } from '@/features/launch/auth/store/PostFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import MultiPositionSelect from '@/components/position/public/MultiPositionSelect';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/ui/error/FieldQueryBoundary';

const LaunchPositionControl = () => {
  const [positionIds, setPositionIds] = useRecoilState(
    postFormFieldSelector('positionIds'),
  );

  const handleChangeSelect = (item: readonly string[]) => {
    setPositionIds(item);
  };

  return (
    <FormRow>
      <Field>
        <Label className='block text-gray-700 mobile:text-sm'>모집 분야</Label>
        <FieldQueryBoundary
          suspenseFallback={
            <SelectSkeleton placeholder='모집 분야를 선택해주세요.' />
          }
        >
          <MultiPositionSelect
            positions={positionIds}
            setPositions={handleChangeSelect}
          />
        </FieldQueryBoundary>
      </Field>
    </FormRow>
  );
};

export default LaunchPositionControl;
