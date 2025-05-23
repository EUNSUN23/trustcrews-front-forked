import { atom } from 'recoil';
import { SelectItem } from '@/shared/types/selectItem';
import { TechStackMapping } from '@/features/techStack/api/getTechStackMappings';
import { DEFAULT_POSITION_OPTION } from '@/features/position/constants/defaultPositionOption';

export const selectedTechStackState = atom<TechStackMapping[]>({
  key: 'selectedTechStackState',
  default: [],
});

export const selectedPositionState = atom<SelectItem<string, string>>({
  key: 'selectedPositionState',
  default: DEFAULT_POSITION_OPTION,
});

export const postSearchValue = atom<string>({
  key: 'postSearchValue',
  default: '',
});
