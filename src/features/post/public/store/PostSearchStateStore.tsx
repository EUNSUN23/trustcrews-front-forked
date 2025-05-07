import { atom } from 'recoil';

import { DEFAULT_POSITION_OPTION } from '@/shared/constants/defaultSelectOptions';
import { PositionId, PositionName } from '@/shared/types/position';
import { TechStackWithCategory } from '@/service/setting/setting';
import { SelectItem } from '@/shared/types/ui';

export const selectedTechStackState = atom<TechStackWithCategory[]>({
  key: 'selectedTechStackState',
  default: [],
});

export const selectedPositionState = atom<SelectItem<PositionName, PositionId>>(
  {
    key: 'selectedPositionState',
    default: DEFAULT_POSITION_OPTION,
  },
);

export const postSearchValue = atom<string>({
  key: 'postSearchValue',
  default: '',
});
