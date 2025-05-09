import { atom } from 'recoil';
import { DEFAULT_POSITION_OPTION } from '@/constants/defaultSelectOptions';
import { SelectItem } from '@/shared/types/selectItem';
import { PositionId, PositionName } from '@/types/data/position';
import { TechStackMapping } from '@/service/techStack/public/getTechStackMappings';

export const selectedTechStackState = atom<TechStackMapping[]>({
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
