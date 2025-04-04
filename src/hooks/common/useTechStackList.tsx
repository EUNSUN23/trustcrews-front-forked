'use client';

import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { snackbarState } from '@/store/CommonStateStore';
import { techListQueryOptions } from '@/utils/tanstackQueryOptions/settingsQuery';

export function useTechStackList() {
  const setSnackBar = useSetRecoilState(snackbarState);
  const { data, isFetching, isError } = useQuery(techListQueryOptions());

  if (isError) {
    setSnackBar({
      show: true,
      type: 'ERROR',
      content: '포지션 목록을 가져올 수 없습니다',
    });
  }

  return { data: data?.data || [], isFetching, isError };
}
