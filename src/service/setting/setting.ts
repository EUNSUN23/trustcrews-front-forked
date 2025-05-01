import {
  PositionItem,
  ResponseBody,
  TechStackCategory,
  TechStackItem,
  TechStackWithCategory,
} from '@/utils/type';

const publicURL = process.env.NEXT_PUBLIC_URL;

/**
 * 포지션 목록 조회
 */
export async function getPositionList(): Promise<ResponseBody<PositionItem[]>> {
  const response = await fetch(`${publicURL}/api/setting/position`);
  return await response.json();
}

/**
 * 기술스택 목록 조회
 */
export async function getTechStackList(): Promise<
  ResponseBody<TechStackItem[]>
> {
  const response = await fetch(`${publicURL}/api/setting/tech-stack`);
  return await response.json();
}

/**
 * 기술스택 카테고리 목록 조회
 */
export async function getTechStackCategoryList(): Promise<
  ResponseBody<TechStackCategory[]>
> {
  const response = await fetch(`${publicURL}/api/setting/tech-stack-category`);
  return await response.json();
}

/**
 * 기술스택 카테고리-기술스택 목록 조회
 */
export async function getTechStackListWithCategory(): Promise<
  ResponseBody<TechStackWithCategory[]>
> {
  const response = await fetch(
    `${publicURL}/api/setting/tech-stack-with-category`,
  );
  return await response.json();
}
