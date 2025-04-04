'use client';

import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { snackbarState } from '@/store/CommonStateStore';
import { positionQueryOptions } from '@/utils/tanstackQueryOptions/settingsQuery';

export function usePositionList() {
  const setSnackBar = useSetRecoilState(snackbarState);

  const { data, isFetching, isError } = useQuery(positionQueryOptions());

  if (isError)
    setSnackBar({
      show: true,
      type: 'ERROR',
      content: '포지션 목록을 가져올 수 없습니다',
    });

  return { data, isFetching, isError };
}
