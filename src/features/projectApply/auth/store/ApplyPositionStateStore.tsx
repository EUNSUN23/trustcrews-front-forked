import { atom } from 'recoil';
import { DEFAULT_POSITION_OPTION } from '@/shared/constants/defaultSelectOptions';
import { PositionId, PositionName } from '@/shared/types/position';
import { SelectItem } from '@/shared/types/ui';

export const projectApplyPositionState = atom<
  SelectItem<PositionName, PositionId>
>({
  key: 'selectRecruitPositionState',
  default: DEFAULT_POSITION_OPTION,
});
