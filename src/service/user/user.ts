import { request } from '@/lib/clientApi/request';

const publicURL = process.env.NEXT_PUBLIC_URL;

export const checkNickname = async (nickname: string) => {
  const response = await fetch(
    `${publicURL}/api/checkNickname?nickname=${nickname}`,
  );
  return response.json();
};

/**
 * 현재 사용자 프로젝트 이력 조회
 * @param pageNumber
 */
export const getUserMeProjectHistory = async (pageNumber: number) => {
  return await request('GET', `/api/user/history-me?pageNumber=${pageNumber}`);
};

/**
 * 특정 사용자 프로젝트 이력 조회
 * @param pageNumber
 * @param userId
 */
export const getUserProjectHistory = async (
  pageNumber: number,
  userId: bigint,
) => {
  return await request(
    'GET',
    `/api/user/history?pageNumber=${pageNumber}&userId=${userId}`,
  );
};

export const deleteProfileImage = async () => {
  return await request('DELETE', '/api/user/profile-img');
};

/**
 * 일반 사용자 정보 조회
 * @param userId
 */
export const getUserInfoByUserId = async (userId: string | bigint) => {
  return await request('GET', `/api/user/general?userId=${userId}`);
};
