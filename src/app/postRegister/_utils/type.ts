import { ArrayValue, PositionId, TechStackValueType } from '@/utils/type';
import { recruitmentCountList } from '@/app/postRegister/_utils/constant';

export type CreatePost = {
  title: string;
  content: string;
  contact: string;
  positionIds: PositionId[];
};

export type CreatePostKey = keyof CreatePost;

type RecruitCount = ArrayValue<typeof recruitmentCountList.values>;
export type RecruitCountValue = RecruitCount['value'];
export type RecruitCountName = RecruitCount['name'];

export type CreateProject = {
  name: string;
  subject: string;
  startDate: string;
  endDate: string;
  technologyIds: readonly TechStackValueType[];
};

export type CreateProjectKey = keyof CreateProject;

export type CreatePostForm = {
  board: CreatePost;
  project: CreateProject;
};
