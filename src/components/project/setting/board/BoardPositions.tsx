import {
  projectSettingBoardInfoSelector,
  ProjectSettingBoardInfoUpdField,
} from '@/store/project/setting/ProjectSettingFormStateStore';
import {useRecoilState} from 'recoil';
import MultiPositionSelect from '@/components/ui/selector/MultiPositionSelect';

type ProjectSettingBoardInfoPositions =
  ProjectSettingBoardInfoUpdField<'positionIds'>;

function BoardPositions({
  initData,
}: {
  initData: ProjectSettingBoardInfoPositions;
}) {
  const [positionsId, setPositionsId] = useRecoilState(
    projectSettingBoardInfoSelector('positionIds'),
  );

  const value =
    (positionsId as ProjectSettingBoardInfoPositions).length > 0
      ? (positionsId as ProjectSettingBoardInfoPositions)
      : initData;

  return (
    <MultiPositionSelect
      positions={value}
      setPositions={(item) => setPositionsId(item)}
    />
  );
}

export default BoardPositions;
