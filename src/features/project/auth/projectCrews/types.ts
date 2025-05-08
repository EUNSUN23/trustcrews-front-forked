import { ProjectAuthMap } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { CREW_STATUS } from '@/features/project/auth/projectCrews/constants/crewStatus';
import { Position } from '@/types/position';
import { TechStackItem } from '@/service/setting/setting';
import { TrustGrade } from '@/types/trustGradeType';

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
  technologyStacks: TechStackItem[];
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
