// todo - getPositionList.ts로 이동?
export interface PositionItem {
  positionId: bigint | number;
  positionName: string;
}

export type PositionId = PositionItem['positionId'];
export type PositionName = PositionItem['positionName'];

export interface Position {
  positionId: bigint;
  name: string;
}
