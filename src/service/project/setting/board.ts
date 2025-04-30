import { request } from '@/lib/clientApi/request';
import { Position } from '@/utils/type';
import { ProjectAuthCode } from '@/features/project/auth/global/types/projectAuth';

export type BoardPosition = {
  boardPositionId: bigint;
  position: Position;
};

export type ProjectSettingBoardData = {
  boardId: bigint;
  title: string;
  recruitmentStatus: boolean;
  boardPositions: BoardPosition[];
  content: string;
  contact: string;
};

/**
 * 프로젝트 세팅 - 프로젝트 게시글 정보 조회
 * @param projectId
 */
export const getProjectSettingBoardInfo = async (projectId: bigint) => {
  return await request(
    'GET',
    `/api/project/setting/board?projectId=${projectId}`,
  );
};

export type ProjectSettingBoardUpdReqData = {
  projectId: bigint;
  boardId: bigint;
  authMap: ProjectAuthCode;
  title: string;
  content: string;
  recruitmentStatus: boolean | null;
  contact: string;
  positionIds: bigint[];
};

/**
 * 프로젝트 세팅 - 프로젝트 게시글정보 수정
 * @param reqData
 */
export const updateProjectSettingBoard = async (
  reqData: ProjectSettingBoardUpdReqData,
) => {
  return await request('PUT', '/api/project/setting/board', reqData);
};
