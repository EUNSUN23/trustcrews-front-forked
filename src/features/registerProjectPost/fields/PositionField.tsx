import MultiPositionSelect from '@/components/ui/selector/MultiPositionSelect';
import {useRecoilState} from 'recoil';
import {postFieldSelector} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import FormRow from '@/components/ui/form/FormRow';

function PositionField() {
  const [{ positionIds }, setPositionIds] = useRecoilState(
    postFieldSelector('positionIds'),
  );

  return (
    <FormRow>
      <MultiPositionSelect
        positions={positionIds!}
        setPositions={(item) => setPositionIds({ positionIds: item })}
      />
    </FormRow>
  );
}

export default PositionField;
