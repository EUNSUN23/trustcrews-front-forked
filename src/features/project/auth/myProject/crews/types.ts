import { ProjectAuthMap } from '@/features/project/auth/myProject/global/types/projectAuth';
import { Position, ProjectUser, User } from '@/utils/type';
import { CREW_STATUS } from '@/features/project/auth/myProject/crews/constants/crewStatus';
import { TaskPointType } from '@/features/project/auth/myProject/global/types/TaskPointType';

export type CrewStatusKey = keyof typeof CREW_STATUS;

export type ProjectCrewProfile = {
  projectMemberId: bigint;
  projectId: bigint;
  projectCount: number;
  user: ProjectUser;
  projectMemberAuth: ProjectAuthMap;
  position: Position;
  status: CrewStatusKey;
};

export type ProjectCrew = {
  projectMemberId: bigint;
  user: User;
  projectMemberAuth: ProjectAuthMap;
  position: Position;
  lastWorkDate: string;
};

export interface CrewTaskHistory {
  workId: bigint;
  trustScoreHistoryId: bigint;
  workContent: string;
  createDate: string;
  progressStatus: CrewStatusKey;
  point: number;
  point_type: TaskPointType;
}
