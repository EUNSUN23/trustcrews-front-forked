import { SelectItem } from '@/shared/types/ui';

export const compareItems = (
  a: SelectItem<string, string>,
  b: SelectItem<string, string>,
) => {
  if (a && b) {
    return a?.value === b?.value;
  }
  return false;
};
