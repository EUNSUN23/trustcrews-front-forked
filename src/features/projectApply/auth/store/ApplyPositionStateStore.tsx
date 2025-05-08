import { atom } from 'recoil';
import { DEFAULT_POSITION_OPTION } from '@/constants/defaultSelectOptions';
import { PositionId, PositionName } from '@/types/position';

import { SelectItem } from '@/shared/types/selectItem';

export const projectApplyPositionState = atom<
  SelectItem<PositionName, PositionId>
>({
  key: 'selectRecruitPositionState',
  default: DEFAULT_POSITION_OPTION,
});
