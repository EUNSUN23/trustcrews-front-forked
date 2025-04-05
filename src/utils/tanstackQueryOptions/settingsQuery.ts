import { queryOptions } from '@tanstack/react-query';
import {
  getPositionList,
  getTechStackCategoryList,
  getTechStackList,
  getTechStackListWithCategory,
} from '@/service/setting/setting';

export function positionQueryOptions() {
  return queryOptions({
    queryKey: ['positions'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getPositionList,
  });
}

export function techCategoryQueryOptions() {
  return queryOptions({
    queryKey: ['techStackCategoryList'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackCategoryList,
  });
}

export function techMapQueryOptions() {
  return queryOptions({
    queryKey: ['techStackListWithCategory'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackListWithCategory,
  });
}

export function techListQueryOptions() {
  return queryOptions({
    queryKey: ['techStacks'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackList,
  });
}
