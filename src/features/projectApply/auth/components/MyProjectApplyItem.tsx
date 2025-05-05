'use client';

import PositionBadge from '@/components/ui/badge/PositionBadge';
import { ProjectApplyStatusData } from '@/features/projectApply/auth/type';
import { ProjectApplyStatusBadge } from '@/components/ui/badge/ProjectApplyStatusBadge';

type ProjectApplyStatusProps = {
  myProjectApply: ProjectApplyStatusData;
};

const MyProjectApplyItem = ({
  myProjectApply: { project_name, position_name, status },
}: ProjectApplyStatusProps) => {
  return (
    <div className='mobile:w-[320px] tablet:w-[450px] flex items-center justify-between'>
      <div className='min-w-0'>
        <div className='flex items-center gap-x-3'>
          <p className='mobile:text-sm tablet:text-xl font-semibold leading-6 text-gray-900'>
            {project_name}
          </p>
          <PositionBadge text={position_name} size='sm' />
        </div>
      </div>
      <div className='flex flex-none items-center'>
        <ProjectApplyStatusBadge applyStatus={status.code}>
          {status.name}
        </ProjectApplyStatusBadge>
      </div>
    </div>
  );
};

export default MyProjectApplyItem;
