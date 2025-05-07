export const sortByStartDate = <T extends Record<'startDate', string>>(
  dataList: T[],
  sortBy: 'asc' | 'desc',
): T[] => {
  const sorted = dataList.sort(function (a, b) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return sortBy === 'desc' ? sorted.reverse() : sorted;
};
