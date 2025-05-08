import { ProjectAuthMap } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { CREW_STATUS } from '@/features/project/auth/projectCrews/constants/crewStatus';
import { TrustGrade } from '@/types/data/trustGrade';

import { Position } from '@/types/data/position';

import { TechStack } from '@/types/data/techStack';

export type CrewStatusKey = keyof typeof CREW_STATUS;

export interface ProjectCrewUserDetail {
  userId: bigint;
  email: string;
  nickname: string;
  profileImgSrc: string;
  position: Position;
  trustGrade: TrustGrade;
  trustScore: number;
  role: string;
  createDate: string;
  updateDate: string;
  technologyStacks: TechStack[];
}

export type ProjectCrewProfileInfo = {
  projectMemberId: bigint;
  projectId: bigint;
  projectCount: number;
  user: ProjectCrewUserDetail;
  projectMemberAuth: ProjectAuthMap;
  position: Position;
  status: CrewStatusKey;
};

export type ProjectCrew = {
  projectMemberId: bigint;
  user: {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
  };
  projectMemberAuth: ProjectAuthMap;
  position: Position;
  lastWorkDate: string;
};
