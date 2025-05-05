import { request } from '@/lib/clientApi/request';

const publicURL = process.env.NEXT_PUBLIC_URL;

/**
 * 일반 사용자 정보 조회
 * @param userId
 */
export const getUserInfoByUserId = async (userId: string | bigint) => {
  return await request('GET', `/api/user/general?userId=${userId}`);
};
