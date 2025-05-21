import { atom } from 'recoil';
import { DEFAULT_POSITION_OPTION } from '@/constants/display/defaultSelectOptions';
import { SelectItem } from '@/shared/types/selectItem';

export const projectApplyPositionState = atom<SelectItem<string, string>>({
  key: 'selectRecruitPositionState',
  default: DEFAULT_POSITION_OPTION,
});
