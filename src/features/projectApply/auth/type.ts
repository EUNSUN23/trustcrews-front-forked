import { ConstantDto, ProjectApplyStatusCode } from '@/utils/type';

export type ProjectApplyStatusData = {
  project_apply_id: bigint;
  project_id: bigint;
  project_name: string;
  position_name: string;
  status: ConstantDto<ProjectApplyStatusCode>;
  apply_message: string;
  createDate: string;
};
