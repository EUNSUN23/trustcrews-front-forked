import {
  TrustGradeNameType,
  TrustGradeValueType,
} from '@/app/project/@setting/_utils/type';
import { VoteStatusCode } from '@/service/project/alert/type';
import { BoardPosition } from '@/service/project/setting/board';
import { UserProjectHistoryStatus } from '@/service/user/constant';

export type DropDownItem = {
  name: string;
  value: string;
  onClickHandler?: (value: string) => void;
};

export interface DropDownProps {
  items: DropDownItem[];
}

export type SelectItem<T, V> = {
  name: T;
  value: V;
};

export interface SelectProps<T, V> {
  items: readonly SelectItem<T, V>[];
  value: SelectItem<T, V>;
  setValue: (item: SelectItem<T, V>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export type MultiSelectProps<T, V> = {
  items: readonly SelectItem<T, V>[];
  values: readonly SelectItem<T, V>[];
  setValues: (value: readonly SelectItem<T, V>[]) => void;
  value?: SelectItem<T, V> | null;
  setValue?: (value: SelectItem<T, V>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

export interface ModalState {
  title: string;
  isOpen: boolean;
}

export interface ConfirmModalState extends ModalState {
  content: string | React.JSX.Element;
  onClickConfirmHandler: () => void;
}

export interface TrustGradeItem {
  trustGradeId: TrustGradeValueType;
  trustGradeName: TrustGradeNameType;
}

export interface PositionItem {
  positionId: bigint;
  positionName: string;
}

export type PositionId = PositionItem['positionId'];
export type PositionName = PositionItem['positionName'];

export interface TechStackCategory {
  techStackCategoryId: bigint;
  techStackCategoryName: string;
}

export interface TechStackItem {
  techStackId: bigint;
  techStackName: string;
}

export type TechStackValueType = TechStackItem['techStackId'];
export type TechStackNameType = TechStackItem['techStackName'];

export interface TechStackWithCategory extends TechStackItem {
  categories: string[];
}

export interface ProfileInfo {
  userId: bigint | null;
  email: string;
  nickname: string;
  profileImgSrc?: string | null;
  trustScore: number;
  trustGrade: TrustGradeItem;
  position: PositionItem;
  techStacks: TechStackItem[];
  intro?: string;
  projectHistoryTotalCount: number;
  createDate: string;
  updateDate: string;
}

// 사용자 프로젝트 이력 status 데이터 타입
export type UserProjectHistoryStatusCode =
  keyof typeof UserProjectHistoryStatus;
export type UserProjectHistoryStatus =
  (typeof UserProjectHistoryStatus)[UserProjectHistoryStatusCode];

export interface UserProjectHistoryData {
  userProjectHistoryId: bigint;
  projectId: bigint;
  status: UserProjectHistoryStatus;
  projectName: string;
  updateDate: string;
}

export type PostCardInfo = {
  project: ProjectInfoSummary;
  boardId: bigint;
  title: string;
  recruitmentStatus: boolean;
  boardPositions: BoardPosition[];
  boardPageView: number;
  user: {
    email: string;
    nickname: string;
    profileImgSrc: string | null;
    trustGrade: TrustGrade;
  };
  createDate: string;
  updateDate: string;
};

export type ResponseResult = 'success' | 'fail';

export type ResponseBody<T> = {
  result: ResponseResult;
  message: string;
  data: T;
};

export type Paged<T> = {
  content: T;
  totalPages: number;
};

export type PageResponseBody<T> = {
  result: ResponseResult;
  message: string;
  data: T extends null ? null : Paged<T>;
};

export interface TrustGrade {
  name: TrustGradeNameType;
  minimumScore: number;
  maximumScore: number;
}

export interface User {
  userId: bigint;
  email: string;
  nickname: string;
  profileImgSrc: string;
}

export interface ProjectUser extends User {
  position: Position;
  trustGrade: TrustGrade;
  trustScore: number;
  role: string;
  createDate: string;
  updateDate: string;
  technologyStacks: TechStackItem[];
}

export interface Position {
  positionId: bigint;
  name: string;
}

export type ProjectInfoSummary = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStackItem[];
};

/**
 * 프로젝트 모집 게시글 - 모집 포지션
 */
export interface PostDetailPosition {
  boardPositionId: bigint;
  position: Position;
}

export type PostPublicInfoData = {
  boardId: bigint;
  projectId: bigint;
  title: string;
  content: string;
  pageView: number;
  recruitmentStatus: boolean;
  user: {
    userId: bigint;
    nickName: string;
    userProfileImgSrc: string | null;
  };
  contact: string;
  createDate: string;
  updateDate: string;
  boardPositions: BoardPosition[];
};

export type ProjectPublicInfoData = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStackItem[];
};

/**
 * 프로젝트 모집 게시글 - 게시글 상세
 */
export type ProjectPostDetailData = {
  post: {
    boardId: bigint;
    title: string;
    content: string;
    pageView: number;
    recruitmentStatus: boolean;
    user: {
      userId: bigint;
      nickName: string;
      userProfileImgSrc: string | null;
    };
    contact: string;
    createDate: string;
    updateDate: string;
    boardPositions: BoardPosition[];
  };
  project: ProjectInfoSummary;
};

export type SnackbarType = 'INFO' | 'ERROR' | 'SUCCESS';

export interface SnackbarState {
  show: boolean;
  type: SnackbarType;
  content: string;
  duration?: number;
}

export interface NoticeCreateForm {
  projectId: bigint;
  checkUserId?: bigint | null;
  sendUserId?: bigint | null;
  workId?: bigint | null;
  milestoneId?: bigint | null;
  positionId?: bigint | null;
  type: string;
  content: string;
}

export interface UserBasicInfo {
  nickname: string;
  profileImgSrc: string;
}

export interface UserProjectNotice {
  alertId: bigint;
  project: {
    projectId: bigint;
    projectName: string;
  };
  position: PositionItem;
  supportResult: boolean | null;
}

export type DataId = string | bigint;

export type ArrayValue<T> = T extends () => IterableIterator<infer U>
  ? U
  : never;

export type ConstantDto<T> = {
  code: T;
  name: string;
};

export type ProjectApplyStatusCode = 'PAS1001' | 'PAS1002' | 'PAS1003';
export type StatusCode = ProjectApplyStatusCode | VoteStatusCode | string;

export type ApiResult<T extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<T>
>;

export type ArrayElement<T> = T extends (infer U)[] ? U : never;
