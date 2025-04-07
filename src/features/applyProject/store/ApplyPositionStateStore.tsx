import { atom } from 'recoil';
import { DEFAULT_POSITION_OPTION } from '@/utils/constant';
import { PositionId, PositionName, SelectItem } from '@/utils/type';

export const projectApplyPositionState = atom<
  SelectItem<PositionName, PositionId>
>({
  key: 'selectRecruitPositionState',
  default: DEFAULT_POSITION_OPTION,
});
