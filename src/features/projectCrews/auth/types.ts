import { ProjectAuthMap } from '@/types/data/projectAuth';
import { CREW_STATUS } from '@/features/projectCrews/auth/constants/crewStatus';
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
  crewId: bigint;
  projectId: bigint;
  projectCount: number;
  user: ProjectCrewUserDetail;
  crewPMAuth: ProjectAuthMap;
  position: Position;
  status: CrewStatusKey;
};

export type ProjectCrew = {
  crewId: bigint;
  user: {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
  };
  crewPMAuth: ProjectAuthMap;
  position: Position;
  lastWorkDate: string;
};
