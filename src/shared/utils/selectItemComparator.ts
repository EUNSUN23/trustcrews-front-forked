import { SelectItem } from '@/shared/types/selectItem';

export const selectItemComparator = (
  a: SelectItem<string, string>,
  b: SelectItem<string, string>,
) => {
  if (a && b) {
    return a?.value === b?.value;
  }
  return false;
};
