import { useRecoilState } from 'recoil';
import MultiPositionSelect from '@/components/position/public/MultiPositionSelect';
import { PositionId } from '@/types/data/position';
import { postInfoFormFieldSelector } from '@/features/projectConfig/private/store/PostInfoFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';
import { Field, Label } from '@headlessui/react';

type PostPositionsProps = {
  initData: PositionId[];
};

const PostPositions = ({ initData }: PostPositionsProps) => {
  const [positionsId, setPositionsId] = useRecoilState(
    postInfoFormFieldSelector('positionIds'),
  );

  const value = positionsId.length > 0 ? positionsId : initData;

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>모집 분야</Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='모집 분야를 선택해주세요.' />
        }
      >
        <MultiPositionSelect
          positions={value}
          setPositions={(item) => setPositionsId(item)}
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default PostPositions;
