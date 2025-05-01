import { Position } from '@/utils/type';

export type BoardPosition = {
  boardPositionId: bigint | number;
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
