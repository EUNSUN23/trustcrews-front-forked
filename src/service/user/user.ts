import { request } from '@/lib/clientApi/request';

const publicURL = process.env.NEXT_PUBLIC_URL;

export const checkNickname = async (nickname: string) => {
  const response = await fetch(
    `${publicURL}/api/checkNickname?nickname=${nickname}`,
  );
  return response.json();
};

/**
 * 일반 사용자 정보 조회
 * @param userId
 */
export const getUserInfoByUserId = async (userId: string | bigint) => {
  return await request('GET', `/api/user/general?userId=${userId}`);
};
