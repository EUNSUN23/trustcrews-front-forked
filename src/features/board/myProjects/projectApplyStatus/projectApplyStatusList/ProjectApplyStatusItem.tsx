'use client';

import PositionBadge from '@/components/ui/badge/PositionBadge';
import { BADGE_SIZE, getStatusBadgeColor } from '@/utils/common';
import { ProjectApplyStatusData } from '@/features/board/myProjects/projectApplyStatus/type';

interface ProjectApplyStatusProps {
  participateNotice: ProjectApplyStatusData;
}

function ProjectApplyStatusItem({
  participateNotice: { project_name, position_name, status },
}: ProjectApplyStatusProps) {
  const { bgColor: applyStatusBgColor, textColor: applyStatusTextColor } =
    getStatusBadgeColor(status.code);

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
        <span
          className={`mr-2 inline-flex items-center rounded-md ${BADGE_SIZE['sm']} ${applyStatusBgColor} font-medium ${applyStatusTextColor} ring-1 ring-inset`}
          aria-hidden={true}
        >
          <p className='sr-only'>{status.name}</p>
          {status.name}
        </span>
      </div>
    </div>
  );
}

export default ProjectApplyStatusItem;
