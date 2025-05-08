import { atom } from 'recoil';
import { DEFAULT_POSITION_OPTION } from '@/constants/defaultSelectOptions';
import { SelectItem } from '@/shared/types/selectItem';

import { PositionId, PositionName } from '@/types/data/position';

export const projectApplyPositionState = atom<
  SelectItem<PositionName, PositionId>
>({
  key: 'selectRecruitPositionState',
  default: DEFAULT_POSITION_OPTION,
});
